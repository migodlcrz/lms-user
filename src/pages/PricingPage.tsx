import { motion } from "framer-motion";
import Lottie from "lottie-react";
import React from "react";
import free from "../images/free-logo.json";

const PricingPage = () => {
  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 h-screen w-full">
      <div className="flex flex-row h-full bg-poly-bg bg-center bg-cover z-0 px-14 py-10 space-x-10">
        <motion.div
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
          className="flex flex-col w-1/3 h-full bg-white rounded-xl p-10"
        >
          <div className="flex flex-col items-center w-full h-1/2 border-b-[0.5px] border-black">
            <h1 className="text-black">Free</h1>
            <Lottie className="h-[80%]" animationData={free} />
          </div>
          <div className="flex flex-col items-center w-full h-1/2"></div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              delay: 0.2,
              duration: 1,
              bounce: 0.4,
            },
          }}
          className="flex flex-col items-center w-1/3 h-full bg-white rounded-xl p-10"
        >
          <h1 className="text-black">Regular</h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              delay: 0.4,
              duration: 1,
              bounce: 0.4,
            },
          }}
          className="flex flex-col items-center w-1/3 h-full bg-white rounded-xl p-10"
        >
          <h1 className="text-black">Premium</h1>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;
