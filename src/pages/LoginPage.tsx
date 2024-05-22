import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col lg:flex-row overflow-hidden">
      <div className="w-full lg:w-1/2 h-20 lg:h-screen relative hidden lg:flex lg:items-center lg:justify-center p-7 bg-poly-bg-yellow bg-cover bg-center">
        <h1 className="text-white">Welcome back! We've missed you! </h1>
      </div>
      <div className="w-full lg:w-1/2">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
