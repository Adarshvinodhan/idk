import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials:true
});

api.interceptors.request.use((config)=>{
  const accessToken = localStorage.getItem('accessToken')
  if(accessToken){
    config.headers['Authorization']= `Bearer ${accessToken}`
  }
  return config
},(err)=>Promise.reject(err));

// Response interceptor: handle 401 and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retrying
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry){
      originalRequest._retry = true;

      try {
        const res = await axios.post('http://localhost:3000/api/getacctoken', {
          refreshToken: localStorage.getItem('refreshToken'),
        });

        const newAccessToken = res.data.accessToken;

        // Save the new token and retry the request
        localStorage.setItem('accessToken', newAccessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Optional: redirect to login
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
