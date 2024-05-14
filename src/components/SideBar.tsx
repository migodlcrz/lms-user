import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/learnify-white.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Track whether sidebar is open or closed
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      onClick={() => !isOpen && toggleSidebar()} // Open sidebar on click if it's closed
      className={`flex items-start transition-all duration-300 overflow-hidden bg-[#1c1c1c] shadow-lg shadow-black z-50 ${
        isOpen ? "w-80" : "w-20"
      }`}
    >
      <div>
        <div className="flex flex-row items-center space-x-4 p-4 w-screen shadow-md bg-gradient-to-r from-caribbean-500 via-caribbean-700 to-caribbean-900">
          <button
            className="text-white hover:text-black text-2xl z-50 mx-3 transition-colors duration-300"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
          </button>
          <div>
            <p className="text-white font-bold text-3xl">Learnify</p>
          </div>
        </div>

        <ul className="flex flex-col">
          <button
            disabled={!isOpen}
            onClick={() => {
              navigate("/dashboard");
              setIsOpen(false);
            }}
            className={`flex flex-row items-center space-x-4 px-2 w-[220px] rounded-xl mx-3 my-4 text-white transition-colors duration-300 ${
              currentPath === "/dashboard"
                ? "bg-gradient-to-r from-caribbean-300 via-caribbean-500 to-caribbean-700"
                : isOpen &&
                  "hover:bg-gradient-to-r hover:from-caribbean-300 hover:via-caribbean-500 hover:to-caribbean-700 hover:text-black"
            }`}
          >
            <li className="grid place-items-center py-2 h-12 text-4xl relative">
              <MdOutlineSpaceDashboard />
            </li>
            {isOpen && <p className="font-bold text-sm w-full">Overview</p>}
          </button>
          <button
            disabled={!isOpen}
            onClick={() => {
              // navigate("/courses");
            }}
            className={`flex flex-row items-center space-x-4 px-2 py-1 w-[220px] rounded-xl mx-3 my-4 text-white transition-colors duration-300 ${
              currentPath === "/courses"
                ? "bg-gradient-to-r from-caribbean-300 via-caribbean-500 to-caribbean-700"
                : isOpen &&
                  "hover:bg-gradient-to-r hover:from-caribbean-300 hover:via-caribbean-500 hover:to-caribbean-700 hover:text-black"
            }`}
          >
            <li className="grid place-items-center py-2 h-12 text-4xl relative">
              <MdOutlineLibraryBooks />
            </li>
            {isOpen && <p className="font-bold text-sm w-full">My Courses</p>}
          </button>
          <button
            disabled={!isOpen}
            onClick={() => {
              navigate("/settings");
              setIsOpen(false);
            }}
            className={`flex flex-row items-center space-x-4 px-2 w-[220px] rounded-xl mx-3 my-4 text-white transition-colors duration-300 ${
              currentPath === "/settings"
                ? "bg-gradient-to-r from-caribbean-300 via-caribbean-500 to-caribbean-700"
                : isOpen &&
                  "hover:bg-gradient-to-r hover:from-caribbean-300 hover:via-caribbean-500 hover:to-caribbean-700 hover:text-black"
            }`}
          >
            <li className="grid place-items-center py-2 h-12 text-4xl relative">
              <CgProfile />
            </li>
            {isOpen && <p className="font-bold text-sm w-full">Profile</p>}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
