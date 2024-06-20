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

  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      const latestPrices = json.map((item: any) => item.latest_price);
      setPrices(latestPrices);
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
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="loading loading-spinner"></div>
      </div>
    );
  }

  // Guard clause: Render only when prices array is not empty
  if (prices.length === 0) {
    return <div>No prices available</div>; // Handle case where no prices are fetched
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
          {/* Render PriceCard components */}
          {prices.map((price, index) => (
            <PriceCard
              key={index}
              name={price.nickname}
              price={price.unit_amount}
              description={
                index === 0
                  ? "Unlock your potential with our Free Plan. Gain access to a curated selection of introductory courses designed to give you a taste of what we offer. Perfect for beginners who want to explore new subjects without any commitment."
                  : index === 1
                  ? "Take your learning to the next level with our Basic Plan. Ideal for learners who want more comprehensive access to our courses. Enjoy a wider range of subjects with enhanced learning materials and resources."
                  : "Maximize your learning experience with our Premium Plan. Perfect for dedicated learners seeking in-depth knowledge and advanced skills. Enjoy full access to our entire course catalog, including exclusive content and premium features."
              }
              animationData={index === 0 ? free : index === 1 ? basic : premium}
              delay={index * 0.2 + 0.2}
              setLoading={setLoading}
              getSession={() => getSession(price.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
