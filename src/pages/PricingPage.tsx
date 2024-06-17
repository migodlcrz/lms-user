import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import PriceCard from "../components/PriceCard";

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
      <div className="flex flex-col h-full bg-poly-bg bg-center bg-cover z-0 px-14 py-10 space-y-2">
        <div className="text-3xl font-black text-white">Subscription Plan</div>
        <div className="flex flex-row h-full w-full space-x-6">
          <PriceCard
            name={prices[0].nickname}
            price={prices[0].unit_amount}
            description="No description available"
            setLoading={setLoading}
            getSession={() => getSession(prices[0].id)}
          />
          <PriceCard
            name={prices[1].nickname}
            price={prices[1].unit_amount}
            description="No description available"
            setLoading={setLoading}
            getSession={() => getSession(prices[1].id)}
          />
          <PriceCard
            name={prices[2].nickname}
            price={prices[2].unit_amount}
            description="No description available"
            setLoading={setLoading}
            getSession={() => getSession(prices[2].id)}
          />
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
