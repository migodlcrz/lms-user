import { motion } from "framer-motion";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import free from "../images/free.json";
import basic from "../images/basic.json";
import premium from "../images/premium.json";
import { useAuthContext } from "../hooks/useAuthContext";

const PricingPage = () => {
  const { user } = useAuthContext();
  const port = process.env.REACT_APP_URL;

  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPrices = async () => {
    const response = await fetch(`${port}/api/subs/prices`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    console.log(json.data);
    setPrices(json.data);
  };

  const getSession = async (priceId: String) => {
    const response = await fetch(`${port}/api/subs/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId: priceId,
        email: user.user_.email,
      }),
    });

    const json = await response.json();

    setLoading(false);

    window.location.href = json.url;
  };

  useEffect(() => {
    fetchPrices();
  }, []);
  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 h-screen w-full">
      <div className="flex flex-col h-full bg-poly-bg bg-center bg-cover z-0 px-14 py-10 space-y-2">
        <div className="text-3xl font-black text-white">Subscription Plan</div>
        <div className="flex flex-row h-full w-full space-x-6">
          {!prices ? (
            "Loading"
          ) : (
            <>
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
                className="flex flex-col w-1/3 h-full bg-white rounded-2xl px-8 py-7 border-8 border-harvest_gold"
              >
                <div className="flex flex-col items-center w-full h-1/2">
                  <h1 className="text-black text-3xl">Free</h1>

                  <Lottie className="h-[80%] p-10" animationData={free} />
                </div>
                <div className="">
                  <span className="text-black font-bold text-5xl">Free</span>
                </div>
                <div className=" border-b-[0.5px] border-black w-full py-2">
                  <button className="btn w-full bg-harvest_gold text-black font-bold text-xl">
                    {loading ? (
                      <div className="loading loading-spinner"></div>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>
                <div className="flex flex-col justify-between w-full h-1/2 py-3">
                  <div className="flex flex-col space-y-5 items-start w-full">
                    <h3 className="flex flex-row items-center justify-center font-semibold text-black text-base">
                      Access to 100 Courses
                    </h3>
                    <h3 className="flex flex-row items-center justify-center font-semibold text-black text-base">
                      Basic and Fundamental Skill-Based Courses
                    </h3>
                  </div>
                </div>
              </motion.div>
              {prices.map((price: any, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      type: "spring",
                      duration: 1,
                      bounce: 0.4,
                      delay: index * 0.5,
                    },
                  }}
                  className="flex flex-col w-1/3 h-full bg-white rounded-2xl px-8 py-7 border-8 border-harvest_gold"
                >
                  <div className="flex flex-col items-center w-full h-1/2">
                    <h1 className="text-black text-3xl">{price.nickname}</h1>
                    {index === 0 && (
                      <Lottie className="h-[80%] p-10" animationData={basic} />
                    )}
                    {index === 1 && (
                      <Lottie
                        className="h-[80%] p-10"
                        animationData={premium}
                      />
                    )}
                  </div>
                  <div className="">
                    <span className="text-black font-bold text-5xl">
                      {(price.unit_amount / 100).toFixed(2)}
                    </span>
                    {price.unit_amount !== 0 && (
                      <span className="text-black font-bold text-xl">USD</span>
                    )}
                  </div>
                  <div className=" border-b-[0.5px] border-black w-full py-2">
                    <button
                      onClick={() => {
                        setLoading(true);
                        // console.log(String(price.id));
                        getSession(String(price.id));
                      }}
                      className="btn w-full bg-harvest_gold text-black font-bold text-xl"
                    >
                      {loading ? (
                        <div className="loading loading-spinner"></div>
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  </div>
                  <div className="flex flex-col justify-between w-full h-1/2 py-3">
                    <div className="flex flex-col space-y-5 items-start w-full">
                      <h3 className="flex flex-row items-center justify-center font-semibold text-black text-base">
                        Access to 100 Courses
                      </h3>
                      <h3 className="flex flex-row items-center justify-center font-semibold text-black text-base">
                        Basic and Fundamental Skill-Based Courses
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
