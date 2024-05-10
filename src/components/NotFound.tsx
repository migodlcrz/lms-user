import Lottie from "lottie-react";
import React from "react";
import landing from "../images/landing.json";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-cream">
      <div className="flex flex-col h-full place-items-center justify-center">
        <div className="h-[50%] w-[30%]">
          <Lottie className="h-[100%] w-[100%]" animationData={landing} />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-black font-bold">404 Error</h2>
          <h3 className="font-bold text-black">Page not found.</h3>
        </div>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="btn p-2 rounded-none bg-cerulean text-white shadow-lg mt-4"
        >
          Back to home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
