import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/learnify.png";
import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();
  const [background, setBackground] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setBackground("");
      } else {
        setBackground("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="navbar w-full p-8 lg:p-3 h-20 fixed top-0 z-50 transition duration-300">
      <motion.h1
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
        className="flex-1 font-bold text-white text-3xl"
      >
        <img src={logo} alt="Loading" width="50" height="50" />
        Learnify
      </motion.h1>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-2 space-x-1">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
            <li
              className={`rounded-none transition duration-300 ${background}`}
            >
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="grid place-item-center font-bold rounded-none"
              >
                <h3 className="text-white font-bold text-xs lg:text-lg">
                  Sign In
                </h3>
              </button>
            </li>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
            <li
              className={`bg-harvest_gold rounded-xl shadow-xl transition duration-300 ${background}`}
            >
              <button
                onClick={() => {
                  navigate("/register");
                }}
                className="grid place-item-center font-bold rounded-xl"
              >
                <h3 className="font-bold text-white text-xs lg:text-lg">
                  Register
                </h3>
              </button>
            </li>
          </motion.div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
