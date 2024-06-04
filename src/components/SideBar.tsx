import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLibraryBooks, MdOutlineShoppingCart } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/learnify-white.png";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineDollarCircle } from "react-icons/ai";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Track whether sidebar is open or closed
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky flex top-0 h-screen z-50">
      <div
        onClick={() => toggleSidebar()}
        className={`flex items-start transition-all h-full duration-300 bg-oslo_gray-950 z-50 cursor-pointer ${
          isOpen ? "w-80" : "w-20"
        }`}
      >
        <div className="w-full h-full">
          <div className="flex flex-row items-center space-x-4 p-4 w-full shadow-md bg-poly-bg-yellow h-[10%]">
            <button
              className="text-white hover:text-black text-2xl z-50 mx-3 transition-colors duration-300"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>
            <div>
              <p
                className={
                  "text-white font-bold text-3xl " + (isOpen ? "" : "hidden")
                }
              >
                Learnify
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between h-[90%]">
            <ul className="flex flex-col p-3 space-y-6">
              <button
                // disabled={!isOpen}
                onClick={() => {
                  if (isOpen) {
                    navigate("/dashboard");
                    setIsOpen(false);
                  } else {
                    setIsOpen(true);
                  }
                }}
                className={`flex flex-row items-center space-x-4 px-2 w-full rounded-xl text-white transition-colors duration-300 ${
                  currentPath === "/dashboard"
                    ? "text-yellow-400"
                    : isOpen &&
                      "hover:text-white hover:bg-gradient-to-r hover:from-harvest_gold-300 hover:to-harvest_gold-500"
                }`}
              >
                <li className="grid place-items-center py-2 h-12 text-4xl relative">
                  <MdOutlineSpaceDashboard />
                </li>
                {isOpen && <p className="font-bold text-sm w-full">Overview</p>}
              </button>
              <button
                // disabled={!isOpen}
                onClick={() => {
                  if (isOpen) {
                    navigate("/courses");
                    setIsOpen(false);
                  } else {
                    setIsOpen(true);
                  }
                }}
                className={`flex flex-row items-center space-x-4 px-2 w-full rounded-xl text-white transition-colors duration-300 ${
                  currentPath === "/courses"
                    ? "text-yellow-400"
                    : isOpen &&
                      "hover:text-white hover:bg-gradient-to-r hover:from-harvest_gold-100 hover:via-harvest_gold-300 hover:to-harvest_gold-500"
                }`}
                data-testid="on-going-courses"
              >
                <li className="grid place-items-center py-2 h-12 text-4xl relative">
                  <MdOutlineLibraryBooks />
                </li>
                {isOpen && (
                  <p className="font-bold text-sm w-full">My Courses</p>
                )}
              </button>
              <button
                // disabled={!isOpen}
                onClick={() => {
                  if (isOpen) {
                    navigate("/store");
                    setIsOpen(false);
                  } else {
                    setIsOpen(true);
                  }
                }}
                className={`flex flex-row items-center space-x-4 px-2 w-full text-white rounded-xl transition-colors duration-300 ${
                  currentPath === "/store"
                    ? "text-yellow-400"
                    : isOpen &&
                      "hover:text-white hover:bg-gradient-to-r hover:from-harvest_gold-100 hover:via-harvest_gold-300 hover:to-harvest_gold-500"
                }`}
                data-testid="available-courses"
              >
                <li className="grid place-items-center py-2 h-12 text-4xl relative">
                  <MdOutlineShoppingCart />
                </li>
                {isOpen && <p className="font-bold text-sm w-full">Store</p>}
              </button>
              <button
                // disabled={!isOpen}
                onClick={() => {
                  if (isOpen) {
                    navigate("/pricing");
                    setIsOpen(false);
                  } else {
                    setIsOpen(true);
                  }
                }}
                className={`flex flex-row items-center space-x-4 px-2 w-full text-white rounded-xl transition-colors duration-300 ${
                  currentPath === "/pricing"
                    ? "text-yellow-400"
                    : isOpen &&
                      "hover:text-white hover:bg-gradient-to-r hover:from-harvest_gold-100 hover:via-harvest_gold-300 hover:to-harvest_gold-500"
                }`}
                data-testid="subscription-plan"
              >
                <li className="grid place-items-center py-2 h-12 text-4xl relative">
                  <AiOutlineDollarCircle />
                </li>
                {isOpen && <p className="font-bold text-sm w-full">Pricing</p>}
              </button>
            </ul>
            <ul className="flex flex-col p-3 space-y-6 bg-harvest_gold">
              <button
                // disabled={!isOpen}
                onClick={() => {
                  if (isOpen) {
                    navigate("/settings");
                    setIsOpen(false);
                  } else {
                    setIsOpen(true);
                  }
                }}
                className={`flex flex-row items-center space-x-4 px-2 w-full rounded-xl text-white transition-colors duration-300 ${
                  currentPath === "/settings"
                    ? "text-white bg-gradient-to-r from-gray-300 to-gray-700 shadow-xl"
                    : isOpen &&
                      "hover:text-white hover:bg-gradient-to-r hover:from-harvest_gold-100 hover:via-harvest_gold-300 hover:to-harvest_gold-500"
                }`}
                data-testid="student-profile"
              >
                <li className="grid place-items-center py-2 h-12 text-4xl relative">
                  <CgProfile />
                </li>
                {isOpen && <p className="font-bold text-sm w-full">Profile</p>}
              </button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
