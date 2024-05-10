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

const LandingInfo = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-col lg:flex-row justify-center w-full h-3/5 shadow-xl bg-cream text-center space-y-4 px-8 lg:px-10">
        <div className="flex flex-col w-full lg:w-2/3 space-y-6 justify-center items-start ">
          <h1 className="text-start text-black text-2xl lg:text-6xl">
            Make your dreams to reality
          </h1>
          <p className="text-black text-justify text-sm lg:text-md">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the {"industry's"} standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <div>
            <button
              onClick={() => navigate("/register")}
              className="btn bg-cerulean rounded-none hover:bg-cerulean-300 shadow-md shadow-black border-cerulean"
            >
              <p className="text-white font-bold text-md lg:text-xl">
                Start Now
              </p>
            </button>
          </div>
        </div>
        <div className="w-1/3 hidden lg:block">
          <Lottie className="h-[100%] w-[100%]" animationData={landing} />
        </div>
      </div>
      <div className="flex flex-row justify-center items-center h-2/5 w-full bg-harvest_gold">
        <div className="w-2/5 h-full relative hidden lg:block">
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
        </div>
        <div className=" flex flex-col lg:flex-row w-full lg:w-2/3 justify-between space-y-2 items-center lg:m-10 lg:px-20">
          <div className="flex flex-col items-center">
            <h1 className="text-black text-4xl lg:text-6xl">2k+</h1>
            <p className="font-bold text-black text-sm lg:text-md">
              Interactive courses
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-black text-4xl lg:text-6xl">1k+</h1>
            <p className="font-bold text-black text-sm lg:text-md">
              Satisfied users
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-black text-4xl lg:text-6xl">10k+</h1>
            <p className="font-bold text-black text-sm lg:text-md">
              Hours of knowledge
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingInfo;
