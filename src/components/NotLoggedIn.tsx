import React from "react";
import Lottie from "lottie-react";
import landing from "../images/landing.json";
import { useNavigate } from "react-router-dom";

const NotLoggedIn = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-wk=hite">
      <div className="flex flex-col h-full place-items-center justify-center space-y-3">
        <div className="h-[50%] w-[30%]">
          <Lottie
            className="h-[100%] w-[100%]"
            animationData={landing}
            loop={false}
          />
        </div>
        <div className="flex flex-col items-center space-y-1">
          <h2 className="text-black font-bold">Not Logged In.</h2>
          <h3 className="font-bold text-black">Cannot access page.</h3>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="btn bg-harvest_gold hover:bg-harvest_gold-200"
          >
            <p className="text-black font-bold">Back to home</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotLoggedIn;
