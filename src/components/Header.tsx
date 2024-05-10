import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/learnify.png";
// import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar w-full p-10 h-20 bg-cream">
      <h1 className="flex-1 font-bold text-black text-3xl">
        <img src={logo} alt="Loading" width="50" height="50" />
        Learnify
      </h1>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-1">
          <li>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="font-bold rounded-none"
            >
              <h3 className="text-black font-bold">Sign In</h3>
            </button>
          </li>
          <li className="bg-harvest_gold">
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="font-bold"
            >
              <h3 className="font-bold text-black ">Register</h3>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
