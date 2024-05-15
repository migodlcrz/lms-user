import React from "react";
import Sidebar from "../components/SideBar";
import { useAuthContext } from "../hooks/useAuthContext";
import Lottie from "lottie-react";
import animation from "../images/online.json";

const DashboardPage = () => {
  const { user } = useAuthContext();
  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 h-screen w-full">
      {/* <div className="h-14 shadow-lg z-10">hello</div> */}
      <div className="flex flex-col h-full bg-gray-50 z-0 p-6">
        <div className="flex-flex-col w-full">
          <h1 className="text-black text-4xl">
            Good Day,{" "}
            <span className="text-caribbean-600">{user.user_.name}</span>
          </h1>
          <h3 className="text-gray-500 font-normal text-sm">
            Here is your profile overview
          </h3>
        </div>
        <div className="flex flex-row h-full w-full">
          <div className="flex flex-col h-full w-2/3 py-4 pr-10 space-y-6">
            <div className="flex flex-row h-28 bg-gradient-to-l items-center shadow-md from-caribbean-500 via-caribbean-700 to-caribbean-900 rounded-xl py-3 px-7">
              <p className="text-caribbean-50 font-bold w-4/5 text-xs md:text-xl">
                You are doing great! So far you have completed 60% of your
                courses. Keep up the good job!
              </p>
              <div className="w-1/5">
                <Lottie animationData={animation} className="mb-20" />
              </div>
            </div>
            <div className="flex flex-col h-full bg-white rounded-xl shadow-md p-3">
              <div className="flex flex-row items-center w-full ">
                <h2 className="font-bold text-black text-3xl border-r-2 border-black pr-3 mr-3">
                  Course Progress
                </h2>
                <p>You're almost finished on this three courses!</p>
              </div>
              <div className=" h-full">RADIAL LAGAY KA DITO</div>
            </div>
          </div>
          <div className="flex flex-col h-full w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
