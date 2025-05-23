import { useState } from 'react';
import AuthForm from "../components/AuthForm";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}); // <-- new state for errors

  const handleSignup = async (formData) => {
    try {
      setErrors({}); // Clear old errors before submitting
      const response = await api.post('/auth/signup', formData);

      toast.success(response.data.message || 'Signup successful!');
      navigate('/');
    } catch (err) {
      if (err.response?.data?.errors) {
        // Group errors by field name (path)
        const groupedErrors = err.response.data.errors.reduce((acc, error) => {
          acc[error.path] = acc[error.path] ? [...acc[error.path], error.msg] : [error.msg];
          return acc;
        }, {});
        setErrors(groupedErrors);
      } else {
        toast.error(err.response?.data?.message || 'Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-gray-100">
      <AuthForm
        showNameField={true}
        title="Signup"
        onSubmit={handleSignup}
        linkText="Already have an account?"
        linkPath="/login"
        errors={errors}  
      />
    </div>
  );
}
