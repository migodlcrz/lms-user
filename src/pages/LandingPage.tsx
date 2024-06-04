import Lottie from "lottie-react";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import Header from "../components/Header";
import landing from "../images/online.json";
import { useNavigate } from "react-router-dom";
import dmitri from "../images/dmitri.png";
import noriel from "../images/noriel.png";
import guy from "../images/guy.png";
import guy2 from "../images/guy2.png";
import patterned from "../images/patterned-background.svg";
import { motion } from "framer-motion";
import book from "../images/book-icon.json";
import savings from "../images/savings-icon.json";
import time from "../images/time-icon.json";
import heroimage from "../images/hero-image.jpg";
import {
  SlSocialFacebook,
  SlSocialGithub,
  SlSocialGoogle,
  SlSocialLinkedin,
  SlSocialSpotify,
  SlSocialTwitter,
} from "react-icons/sl";
import blob from "../images/blob.svg";
import reading from "../images/reading-man-clear.png";
import readingMan from "../images/landing-icon.svg";

const LandingInfo = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="flex flex-col h-screen overflow-hidden"
        data-testid="landing-page"
      >
        <Header />
        <div
          className="flex flex-col lg:flex-row justify-center w-full h-full shadow-xl bg-poly-bg bg-cover bg-center text-center space-y-4 px-8 lg:px-10"
          // style={{
          //   backgroundImage: `url(${heroimage})`,
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          // }}
        >
          <div className="flex flex-row w-full space-y-6 items-center">
            <div className="flex flex-col items-start w-1/2 space-y-4">
              <h1 className="text-start text-white text-2xl lg:text-6xl">
                <span className="text-white font-bold">
                  Fly Toward Your Goals with
                </span>{" "}
                <span className="text-harvest_gold text-shadow shadow-black">
                  Learnify
                </span>
              </h1>
              <p className="font-semibold text-white text-start">
                Hundreds of online courses, just a click away. Get ready to
                embark on your learning journey{" "}
              </p>
              <div className="flex flex-col items-start space-y-1">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.1 }}
                >
                  <button
                    onClick={() => navigate("/register")}
                    className="btn bg-harvest_gold border-harvest_gold hover:bg-harvest_gold-400 hover:border-harvest_gold-400 shadow-md shadow-black"
                    data-testid="signup-button"
                  >
                    <p className="text-white font-bold text-md lg:text-xl">
                      Get Started
                    </p>
                  </button>
                </motion.div>
                <p
                  onClick={() => navigate("/login")}
                  className="text-white text-xs"
                  data-testid="login-button"
                >
                  Already have an account?{" "}
                  <span className="text-harvest_gold border-b-[0.5px] border-harvest_gold cursor-pointer hover:text-harvest_gold-400 hover:border-harvest_gold-400 transition-color duration-300">
                    Click here
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-1/2 h-full space-y-4">
              <div className="image-container h-[70%] w-[70%]  relative">
                <img
                  src={readingMan}
                  className=" h-full w-full absolute top-0 left-0"
                  alt="Reading icon"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-row justify-center items-center h-1/5 w-full bg-poly-bg bg-cover bg-center">
          <div className="flex flex-col items-center justify-evenly w-full h-full">
            <h2 className="text-xl font-bold text-white">
              Powered by collaboration with
            </h2>
            <div className="flex flex-row w-full justify-center items-center space-x-12 text-white text-3xl">
              <span className="">
                <SlSocialFacebook />
              </span>
              <span className="">
                <SlSocialGoogle />
              </span>
              <span className="">
                <SlSocialGithub />
              </span>
              <span className="">
                <SlSocialLinkedin />
              </span>
              <span className="">
                <SlSocialTwitter />
              </span>
              <span className="">
                <SlSocialSpotify />
              </span>
            </div>
          </div>
        </div> */}
      </div>
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="flex h-1/4 bg-oslo_gray-200 relative p-2 shadow-inner shadow-black">
          <div className=" flex flex-row space-x-6 absolute w-[95%] h-full bottom-0 left-1/2 translate-y-[15%] translate-x-[-50%] shadow-xl">
            <div className="flex flex-row bg-slate-50 w-1/3 h-full rounded-xl shadow-xl shadow-black p-4">
              <div className="flex justify-center h-full w-1/4 p-2">
                <h2>
                  <Lottie animationData={book} className="w-full h-full" />
                </h2>
              </div>
              <div className="flex flex-col justify-center h-full w-3/4">
                <h2 className="text-lg font-bold">
                  Explore a World of Knowledge
                </h2>
                <p className="text-black text-sm text-justify">
                  With our diverse courses, there's always something new to
                  discover, whether you're a beginner or expert.
                </p>
              </div>
            </div>
            <div className="flex flex-row bg-slate-50 w-1/3 h-full rounded-xl shadow-xl shadow-black p-4">
              <div className="flex justify-center h-full w-1/4 p-2">
                <h2>
                  <Lottie animationData={savings} className="w-full h-full" />
                </h2>
              </div>
              <div className="flex flex-col justify-center h-full w-3/4">
                <h2 className="text-lg font-bold">
                  Quality Education, Affordable Prices
                </h2>
                <p className="text-black text-sm text-justify">
                  Access our extensive course catalog without breaking the bank,
                  making learning accessible to all.
                </p>
              </div>
            </div>
            <div className="flex flex-row bg-slate-50 w-1/3 h-full rounded-xl shadow-xl shadow-black p-4">
              <div className="flex justify-center h-full w-1/4 p-2">
                <h2>
                  <Lottie animationData={time} className="w-full h-full" />
                </h2>
              </div>
              <div className="flex flex-col justify-center h-full w-3/4">
                <h2 className="text-lg font-bold">Learning Without Limits</h2>
                <p className="text-black text-sm text-justify">
                  Study on your terms—morning, afternoon, or night. Our flexible
                  approach fits learning seamlessly into your life.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start pt-14 h-3/4 bg-poly-bg bg-cover bg-center">
          <div>
            <h1 className="font-semibold text-black">Popular Courses</h1>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default LandingInfo;
