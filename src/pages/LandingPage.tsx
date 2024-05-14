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
import { motion } from "framer-motion";
import heroimage from "../images/hero-image.jpg";
import {
  SlSocialFacebook,
  SlSocialGithub,
  SlSocialGoogle,
  SlSocialLinkedin,
  SlSocialSpotify,
  SlSocialTwitter,
} from "react-icons/sl";

const LandingInfo = () => {
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <div
          className="flex flex-col lg:flex-row justify-center w-full h-4/5 shadow-xl bg-cream text-center space-y-4 px-8 lg:px-10"
          style={{
            backgroundImage: `url(${heroimage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col w-full space-y-6 justify-center items-start">
            <div className="flex flex-col items-start w-1/2 space-y-4">
              <h1 className="text-start text-white text-2xl lg:text-6xl">
                <span className="text-caribbean-50 font-semibold">
                  Fly Toward Your Goals with
                </span>{" "}
                <span className="text-caribbean-300 text-shadow shadow-black">
                  Learnify
                </span>
              </h1>
              <p className="font-semibold text-white text-start">
                Hundreds of online courses, just a click away. Get ready to
                embark on your learning journey{" "}
              </p>
              <div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.1 }}
                >
                  <button
                    onClick={() => navigate("/register")}
                    className="btn bg-caribbean bg-gradient-to-b from-caribbean-500 to-caribbean-600 hover:bg-caribbean-300 shadow-md shadow-black border-cerulean"
                  >
                    <p className="text-black font-bold text-md lg:text-xl">
                      Start Now
                    </p>
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center h-1/5 w-full bg-caribbean-200 ">
          <div className="flex flex-col items-center justify-evenly w-full h-full">
            <h2 className="text-xl font-bold text-black">
              Powered by collaboration with
            </h2>
            <div className="flex flex-row w-full justify-center items-center space-x-12 text-caribbean-900 text-2xl">
              <span className="">
                <SlSocialFacebook />
                {/* <p className="text-lg">facebook</p> */}
              </span>
              <span className="">
                <SlSocialGoogle />
                {/* <p className="text-lg">google</p> */}
              </span>
              <span className="">
                <SlSocialGithub />
                {/* <p className="text-lg">github</p> */}
              </span>
              <span className="">
                <SlSocialLinkedin />
                {/* <p className="text-lg">linkedin</p> */}
              </span>
              <span className="">
                <SlSocialTwitter />
                {/* <p className="text-lg">twitter</p> */}
              </span>
              <span className="">
                <SlSocialSpotify />
                {/* <p className="text-lg">spotify</p> */}
              </span>
            </div>
          </div>
          {/* <div className="w-2/5 h-full relative hidden lg:block">
          <Carousel
            showArrows={false}
            autoPlay={true}
            interval={1500}
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
          >
            <div>
              <img src={dmitri} alt="Banner" width={1200} height={300} />
            </div>
            <div>
              <img src={guy} alt="Banner" width={1200} height={300} />
            </div>
            <div>
              <img src={noriel} alt="Banner" width={1200} height={300} />
            </div>
            <div>
              <img src={guy2} alt="Banner" width={1200} height={300} />
            </div>
          </Carousel>
        </div> */}
        </div>
      </div>
      <div className="flex flex-col h-screen overflow-hidden bg-caribbean-200"></div>
    </>
  );
};

export default LandingInfo;
