import React from "react";
import RegisterForm from "../components/RegisterForm";
import registerPic from "../images/noriel.png";
import { motion } from "framer-motion";

const RegisterPage = () => {
  return (
    <div className="flex flex-col lg:flex-row overflow-hidden">
      <div className="w-full lg:w-1/2 h-20 lg:h-screen relative hidden lg:flex lg:items-center lg:justify-center p-7 bg-poly-bg-yellow bg-cover bg-center">
        <motion.h1
          className="text-white"
          initial={{ opacity: 0, x: -30 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              duration: 1,
              bounce: 0.4,
            },
          }}
        >
          Start your learning journey here at Learnify
        </motion.h1>
      </div>
      <div className="w-full lg:w-1/2">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
