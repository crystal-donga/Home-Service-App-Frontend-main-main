
import AuthLayout from "../components/layout/AuthLayout";
import LoginForm from "../components/auth/LoginForm";
import { useEffect } from "react";
const Login = () => {
  useEffect(()=>{
          document.title="Login"
      },[])
  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Welcome back! Please enter your details to continue."
      bgImage="/assets/images/workspace.jpg"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
