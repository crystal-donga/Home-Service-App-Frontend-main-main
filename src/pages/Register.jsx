import React ,{useEffect}from "react";
import AuthLayout from "../components/layout/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  useEffect(()=>{
          document.title="Register"
      },[])
  return (
    <AuthLayout
      title="Create an account"
      // subtitle="Start your 14-day free trial today."
      bgImage="/assets/images/register2.jpg"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
