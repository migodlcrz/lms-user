import { motion } from "framer-motion";
import Lottie from "lottie-react";
import React from "react";
import free from "../images/free.json";
import basic from "../images/basic.json";
import premium from "../images/premium.json";
import { RiCheckboxCircleLine } from "react-icons/ri";

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
          className="flex flex-col w-1/3 h-full bg-white rounded-2xl px-10 pb-7 border-8 border-harvest_gold"
        >
          <div className="flex flex-col items-center w-full h-1/2 border-b-[0.5px] border-black">
            <h1 className="text-black">Free</h1>
            <Lottie className="h-[80%] p-10" animationData={free} />
          </div>
          <div className="flex flex-col justify-between w-full h-1/2 py-3">
            <div className="flex flex-col space-y-5 items-start w-full">
              <h3 className="flex flex-row items-center justify-center text-black font-bold text-2xl">
                Access to 100 Courses
              </h3>
              <h3 className="flex flex-row items-center justify-center text-black font-bold text-2xl">
                Basic and Fundamental Skill-Based Courses
              </h3>
            </div>
            <div>
              <button className="btn w-full bg-harvest_gold text-black font-bold text-xl">
                Activated
              </button>
            </div>
          </div>
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
          className="flex flex-col w-1/3 h-full bg-white rounded-2xl px-10 pb-7 border-8 border-harvest_gold"
        >
          <div className="flex flex-col items-center w-full h-1/2 border-b-[0.5px] border-black">
            <h1 className="text-black">Regular</h1>
            <Lottie className="h-[80%] p-10" animationData={basic} />
          </div>{" "}
          <div className="flex flex-col justify-between w-full h-1/2 py-3">
            <div className="flex flex-col space-y-5 items-start w-full">
              <h3 className="flex flex-row items-center justify-center text-black font-bold text-2xl">
                Access to 100 Courses
              </h3>
              <h3 className="flex flex-row items-center justify-center text-black font-bold text-2xl">
                Basic and Fundamental Skill-Based Courses
              </h3>
            </div>
            <div>
              <button className="btn w-full bg-harvest_gold text-black font-bold text-xl">
                Subscribe
              </button>
            </div>
          </div>
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
          className="flex flex-col w-1/3 h-full bg-white rounded-2xl px-10 pb-7 border-8 border-harvest_gold"
        >
          <div className="flex flex-col items-center w-full h-1/2 border-b-[0.5px] border-black">
            <h1 className="text-black">Premium</h1>
            <Lottie className="h-[80%] p-10" animationData={premium} />
          </div>{" "}
          <div className="flex flex-col justify-between w-full h-1/2 py-3">
            <div className="flex flex-col space-y-5 items-start w-full">
              <h3 className="flex flex-row items-center justify-center text-black font-bold text-2xl">
                Access to 100 Courses
              </h3>
              <h3 className="flex flex-row items-center justify-center text-black font-bold text-2xl">
                Basic and Fundamental Skill-Based Courses
              </h3>
            </div>
            <div>
              <button className="btn w-full bg-harvest_gold text-black font-bold text-xl">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;
