import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/learnify-green.png";
import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();
  const [background, setBackground] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setBackground("rgba(144, 245, 195, 0.9)"); // Change to your desired color
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
    <div
      className="navbar w-full p-8 lg:p-3 h-20 fixed top-0 z-50 transition duration-300"
      style={{ backgroundColor: background }}
    >
      <h1 className="flex-1 font-bold text-black text-3xl">
        <img src={logo} alt="Loading" width="50" height="50" />
        Learnify
      </h1>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-2 space-x-1">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
            <li className="rounded-none">
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
            <li className="bg-gradient-to-b from-caribbean-500 to-caribbean-600 rounded-xl">
              <button
                onClick={() => {
                  navigate("/register");
                }}
                className="grid place-item-center font-bold rounded-xl"
              >
                <h3 className="font-bold text-black text-xs lg:text-lg">
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
