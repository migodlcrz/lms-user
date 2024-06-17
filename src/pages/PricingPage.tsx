import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import PriceCard from "../components/PriceCard";
import free from "../images/free.json";
import basic from "../images/basic.json";
import premium from "../images/premium.json";

const PricingPage = () => {
  const { user } = useAuthContext();
  const port = process.env.REACT_APP_URL;

  const [prices, setPrices] = useState<any>([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true

  const fetchPrices = async () => {
    try {
      const response = await fetch(`${port}/api/subs/prices`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prices");
      }

      const json = await response.json();
      setPrices(json.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getSession = async (priceId: String) => {
    setLoading(true);
    try {
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

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      const json = await response.json();
      window.location.href = json.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen ">
        <div className="loading loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 h-screen w-full">
      <div className="flex flex-col h-full bg-poly-bg bg-center bg-cover z-0 px-14 py-10 space-y-5 items-center">
        <h1 className="font-black text-white">Pricing</h1>
        <p className="text-white font-bold text-2xl">
          Welcome to Learnify, where flexible, one-time payment plans make
          learning simplified!
        </p>
        <div className="flex flex-row h-full w-full space-x-6">
          <PriceCard
            name={prices[0].nickname}
            price={prices[0].unit_amount}
            description="Unlock your potential with our Free Plan. Gain access to a curated selection of introductory courses designed to give you a taste of what we offer. Perfect for beginners who want to explore new subjects without any commitment."
            animationData={free}
            delay={0.2}
            setLoading={setLoading}
            getSession={() => getSession(prices[0].id)}
          />
          <PriceCard
            name={prices[1].nickname}
            price={prices[1].unit_amount}
            description="Take your learning to the next level with our Basic Plan. Ideal for learners who want more comprehensive access to our courses. Enjoy a wider range of subjects with enhanced learning materials and resources."
            animationData={basic}
            delay={0.4}
            setLoading={setLoading}
            getSession={() => getSession(prices[1].id)}
          />
          <PriceCard
            name={prices[2].nickname}
            price={prices[2].unit_amount}
            description="Maximize your learning experience with our Premium Plan. Perfect for dedicated learners seeking in-depth knowledge and advanced skills. Enjoy full access to our entire course catalog, including exclusive content and premium features."
            animationData={premium}
            delay={0.6}
            setLoading={setLoading}
            getSession={() => getSession(prices[2].id)}
          />
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
