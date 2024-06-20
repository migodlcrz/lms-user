import { motion } from "framer-motion";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { User } from "../interfaces/UserInterface";
import { toast } from "react-toastify";

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
      className={`flex flex-col w-1/3 h-full rounded-2xl px-8 py-7 ${
        userTier === name
          ? "border-harvest_gold-400 border-8 bg-yellow-200"
          : " bg-white"
      }`}
    >
      <div className="flex flex-col items-center w-full h-1/2">
        <h1 className="text-black text-3xl">{name} Plan</h1>

        <Lottie className="h-[80%] p-10" animationData={animationData} />
      </div>
      <div className="">
        <span className="text-black font-bold text-5xl">
          {!price ? "Free" : (price / 100).toFixed(2)}
        </span>

        <span className="text-black font-bold text-xl">{!!price && "USD"}</span>
      </div>
      <div className=" border-b-[0.5px] border-black w-full py-2">
        {userTier === "Free" &&
          (name === "Free" ? (
            <div className="btn w-full bg-white text-black font-bold text-xl hover:bg-white hover:border-white border-white cursor-auto">
              Activated
            </div>
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
            <div className="btn w-full bg-harvest_gold text-black font-bold text-xl hover:bg-harvest_gold hover:border-harvest_gold border-harvest_gold cursor-auto">
              Upgraded
            </div>
          ) : name === "Basic" ? (
            <div className="btn w-full bg-white text-black font-bold text-xl hover:bg-white hover:border-white border-white cursor-auto">
              Activated
            </div>
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
        {userTier === "Premium" &&
          (name === "Premium" ? (
            <div className="btn w-full bg-white text-black font-bold text-xl hover:bg-white hover:border-white border-white cursor-auto">
              Activated
            </div>
          ) : (
            <div className="btn w-full bg-harvest_gold text-black font-bold text-xl hover:bg-harvest_gold hover:border-harvest_gold border-harvest_gold cursor-auto">
              Upgraded
            </div>
          ))}
        {/* {userTier === "Premium" && name !== "Premium" ? (
          <div className="btn w-full bg-harvest_gold text-black font-bold text-xl hover:bg-harvest_gold hover:border-harvest_gold border-harvest_gold cursor-auto">
            Upgraded
          </div>
        ) : (
          <div className="btn w-full bg-white text-black font-bold text-xl hover:bg-white hover:border-white border-white cursor-auto">
            Activated
          </div>
        )} */}

        {/* <div className="btn w-full bg-white text-black font-bold text-xl hover:bg-white hover:border-white border-white cursor-auto">
          Activated
        </div>
        <div className="btn w-full bg-harvest_gold text-black font-bold text-xl hover:bg-harvest_gold hover:border-harvest_gold border-harvest_gold cursor-auto">
          Upgraded
        </div>
        <button
          onClick={() => {
            setLoading(true);
            getSession();
          }}
          className="btn w-full bg-harvest_gold text-black font-bold text-xl"
        >
          Subscribe
        </button> */}
      </div>
      <div className="flex flex-col justify-between w-full h-1/2 py-3">
        <div className="flex flex-col space-y-5 items-start w-full">
          <h3 className="flex items-center justify-center font-semibold text-black text-justify">
            {description}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default PriceCard;
