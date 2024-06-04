import React from "react";

const PricingPage = () => {
  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 h-screen w-full">
      <div className="flex flex-row h-full bg-poly-bg bg-center bg-cover z-0 px-14 py-10 space-x-10">
        <div className="w-1/3 h-full bg-white rounded-xl p-3">Free</div>
        <div className="w-1/3 h-full bg-white rounded-xl p-3">Basic</div>
        <div className="w-1/3 h-full bg-white rounded-xl p-3">Premium</div>
      </div>
    </div>
  );
};

export default PricingPage;
