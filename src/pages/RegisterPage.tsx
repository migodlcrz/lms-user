import React from "react";
import RegisterForm from "../components/RegisterForm";
import registerPic from "../images/noriel.png";

const RegisterPage = () => {
  return (
    <div className="flex flex-col lg:flex-row overflow-hidden">
      <div className="w-full lg:w-1/2 h-20 lg:h-screen relative hidden lg:flex lg:items-center lg:justify-center p-7 bg-poly-bg-yellow bg-cover bg-center">
        <h1 className="text-white">
          Start your learning journey here at Learnify
        </h1>
      </div>
      <div className="w-full lg:w-1/2">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
