import { useNavigate } from "react-router-dom";
import logo from "../images/learnify.png";
import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar w-full p-8 lg:p-10 h-20 bg-cream">
      <h1 className="flex-1 font-bold text-black text-3xl">
        <img src={logo} alt="Loading" width="50" height="50" />
        Learnify
      </h1>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-1">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
            <li className="rounded-none">
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="grid place-item-center font-bold rounded-none"
              >
                <h3 className="text-black font-bold text-xs lg:text-lg">
                  Sign In
                </h3>
              </button>
            </li>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
            <li className="bg-harvest_gold">
              <button
                onClick={() => {
                  navigate("/register");
                }}
                className="grid place-item-center font-bold rounded-none"
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
