import AuthForm from "../components/AuthForm";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const response = await api.post('/login', {
        email: formData.email,
        password: formData.password,
      });
      toast.success("Login Successful");

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      navigate('/');
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data ||
        "Login failed";
      console.log(message)

      toast.error(message);
    }
  };

  return (
<div className="flex items-center justify-center min-h-screen bg-gray-50">
  <AuthForm
    title="Login"
    onSubmit={handleLogin}
    linkText="Don't have an Account?"
    linkPath="/register"
  />
</div>

  );
}
