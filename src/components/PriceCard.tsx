import { motion } from "framer-motion";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { User } from "../interfaces/UserInterface";
import { toast } from "react-toastify";
import { FaPerson } from "react-icons/fa6";
import { FaDotCircle } from "react-icons/fa";

interface PriceCardProps {
  name: string;
  price: number;
  description: string;
  animationData: object;
  delay: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getSession: () => void;
}

const PriceCard: React.FC<PriceCardProps> = ({
  name,
  price,
  description,
  animationData,
  delay,
  setLoading,
  getSession,
}) => {
  const { user } = useAuthContext();
  const port = process.env.REACT_APP_URL;
  const [userTier, setUserTier] = useState<string>("");

  const fetchUser = async () => {
    const response = await fetch(`${port}/api/user/${user.user_._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      return toast.error(json.error);
    }

    setUserTier(json.tier);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.4,
          delay: delay,
        },
      }}
      className={`flex flex-row w-full h-1/3 rounded-md p-5 ${
        userTier === name
          ? "bg-gradient-to-tl from-[#eca40050] to-harvest_gold-700"
          : " bg-gradient-to-tl from-[#201c2100] to-raisin_black-500"
      }`}
    >
      <div className="flex flex-col w-1/3 h-full ">
        <div className="flex flex-row items-start w-full h-1/2 space-x-3">
          <div className="flex items-center justify-center font-bold text-harvest_gold-800 text-2xl w-10 h-10 bg-harvest_gold-400 rounded-full">
            {name === "Free" && "F"}
            {name === "Basic" && "B"}
            {name === "Premium" && "P"}
          </div>
          <h1 className="text-white text-3xl">{name}</h1>
        </div>
        <span className="text-white font-bold text-5xl">
          <div>
            <span className="text-white font-bold text-5xl">
              {!price ? "Starting Plan" : (price / 100).toFixed(2)}
            </span>

            <span className="text-white font-bold text-xl">
              {!!price && "USD"}
            </span>
          </div>
        </span>
        <div className=" w-full py-2">
          {userTier === "Free" &&
            (name === "Free" ? (
              <div className="text-white font-bold text-xl">Current Plan</div>
            ) : (
              <button
                onClick={() => {
                  setLoading(true);
                  getSession();
                }}
                className="btn w-full bg-harvest_gold text-black font-bold text-xl"
              >
                Subscribe
              </button>
            ))}
          {userTier === "Basic" &&
            (name === "Free" ? (
              <div className="text-harvest_gold font-bold text-xl">
                Upgraded
              </div>
            ) : name === "Basic" ? (
              <div className="text-white font-bold text-xl">Current Plan</div>
            ) : (
              <button
                onClick={() => {
                  setLoading(true);
                  getSession();
                }}
                className="text-harvest_gold font-bold text-xl hover:text-white transition-colors"
              >
                Subscribe
              </button>
            ))}
          {userTier === "Premium" &&
            (name === "Premium" ? (
              <div className="text-white font-bold text-xl">Current Plan</div>
            ) : (
              <div className="text-harvest_gold font-bold text-xl">
                Upgraded
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col w-2/3 h-full">
        <div className="flex flex-row items-center space-x-3 text-white text-2xl font-semibold">
          <span className="text-harvest_gold text-xs">
            <FaDotCircle />
          </span>{" "}
          <span>100 Courses</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PriceCard;
