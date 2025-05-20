import AuthForm from "../components/AuthForm";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      const response = await api.post('/signup', {
        email: formData.email,
        name: formData.name,
        password: formData.password
      });

      toast.success(response.data.message || 'Signup successful!');
      navigate('/')
    } catch (err) {
      const message =
        err.response?.data?.message || 'Signup failed. Please try again.';
      toast.error(message);
    }
  };
  return (

    <div className="flex items-center  min-h-screen bg-gray-50">
      <AuthForm showNameField={true} title={"Signup"} onSubmit={handleSignup} linkText={"Already have an account?"} linkPath={'/login'} />
    </div>
  )
}