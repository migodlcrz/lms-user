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

  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 h-screen w-full">
      <div className="flex flex-row h-full bg-raisin_black-300 z-0 px-14 py-10 space-x-2 items-center">
        <div className="flex flex-col items-start justify-center w-1/2 h-full">
          <h1 className="font-black text-harvest_gold">Choose your plan!</h1>
          <p className="text-white font-semibold text-2xl">
            Welcome to Learnify, where flexible, one-time payment plans make
            learning simplified!
          </p>
        </div>
        <div className="flex flex-col w-1/2 h-full space-y-2">
          {/* Render PriceCard components */}
          {prices.map((price, index) => (
            <PriceCard
              key={index}
              name={price.nickname}
              price={price.unit_amount}
              description="Description"
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
