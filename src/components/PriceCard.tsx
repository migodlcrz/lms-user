import { motion } from "framer-motion";
import Lottie from "lottie-react";
import free from "../images/free.json";
import React from "react";

interface PriceCardProps {
  name: string;
  price: number;
  description: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getSession: () => void;
}

const PriceCard: React.FC<PriceCardProps> = ({
  name,
  price,
  description,
  setLoading,
  getSession,
}) => {
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
          delay: 0.5,
        },
      }}
      className={`flex flex-col w-1/3 h-full bg-white rounded-2xl px-8 py-7 border-8 border-harvest_gold`}
    >
      <div className="flex flex-col items-center w-full h-1/2">
        <h1 className="text-black text-3xl">{name}</h1>

        <Lottie className="h-[80%] p-10" animationData={free} />
      </div>
      <div className="">
        <span className="text-black font-bold text-5xl">
          {!price ? "Free" : (price / 100).toFixed(2)}
        </span>

        <span className="text-black font-bold text-xl">{!!price && "USD"}</span>
      </div>
      <div className=" border-b-[0.5px] border-black w-full py-2">
        <button
          onClick={() => {
            setLoading(true);
            getSession();
          }}
          className="btn w-full bg-harvest_gold text-black font-bold text-xl"
        >
          Subscribe
        </button>
      </div>
      <div className="flex flex-col justify-between w-full h-1/2 py-3">
        <div className="flex flex-col space-y-5 items-start w-full">
          <h3 className="flex flex-row items-center justify-center font-semibold text-black text-base">
            {description}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default PriceCard;
