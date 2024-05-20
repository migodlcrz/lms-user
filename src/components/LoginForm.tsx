"use client";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
// import { useLogin } from "../hooks/useLogin";
import { useGoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import layeredBG from "../images/lowpoly-bg.svg";

interface LogForm {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState<LogForm>({
    email: "",
    password: "",
  });
  const [seePassword, setSeePassword] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const { login, googleLogin } = useLogin();

  const clearForm = () => {
    setLoginForm({
      email: "",
      password: "",
    });
  };

  const changeHandler = (field: string, value: string) => {
    setLoginForm({ ...loginForm, [field]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("HELLo");
      await login(loginForm);
      clearForm();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const json = await res.json();
        console.log(json);

        googleLogin(json.email, json.sub);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div
      className="flex flex-col h-full justify-center px-40 bg-slate-50"
      // style={{
      //   backgroundImage: `url(${layeredBG})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      {/* <div className="grid place-items-center h-screen bg-white">
        <div className="bg-white shadow-lg p-5 min-w-80 border-t-4 border-harvest_gold m-10"> */}
      <div className="flex flex-row ">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="text-3xl lg:text-4xl text-caribbean hover:text-cerulean-300
          "
        >
          <MdKeyboardArrowLeft />
        </button>
        <h1 className="text-sm lg:text-xl font-bold my-4 text-center text-black">
          Login
        </h1>
      </div>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Email"
          className="input-md border-caribbean border-2 shadow-md rounded-xl"
          data-testid=""
          value={loginForm.email}
          onChange={(e) => {
            changeHandler("email", e.target.value);
          }}
        />
        <input
          type={seePassword ? "text" : "password"}
          placeholder="Password"
          className="input-md border-caribbean border-2 shadow-md rounded-xl"
          data-testid=""
          value={loginForm.password}
          onChange={(e) => {
            changeHandler("password", e.target.value);
          }}
        />
        <div className="flex flex-row items-center text-sm">
          <input
            type="checkbox"
            className="checkbox checkbox-xs mr-2 border-caribbean"
            onClick={() => {
              setSeePassword(!seePassword);
            }}
          />{" "}
          <p>Show Password</p>
        </div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
          <button className="btn bg-gradient-to-b from-caribbean-500 to-caribbean-600 text-white font-bold cursor-pointer py-2 hover:bg-harvest_gold-300 hover:text-slate-200 w-full rounded-xl">
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <span className="text-lg lg:text-md text-black font-bold">
                Login
              </span>
            )}
          </button>
        </motion.div>
      </form>
      <div className="w-full text-start mt-2 text-sm lg;text-md">
        <a className="text-sm mt-3 text-center" href={"/register"}>
          {"Don't have an account?"}{" "}
          <span className="text-caribbean-700 hover:text-caribbean-900 font-bold">
            Register
          </span>
        </a>
      </div>
      <div className="flex justify-center items-center w-full gap-3 py-3">
        <div className="border-b-2 border-caribbean-800 py-2 w-full px-6"></div>
        <div className="mt-3 text-caribbean-800">or</div>
        <div className="border-b-2 border-caribbean-800 py-2 w-full px-6"></div>
      </div>
      <div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
          <button
            onClick={() => handleGoogleLogin()}
            className="flex flex-row items-center justify-center space-x-4 border-[0.5px] border-black w-full p-2 rounded-xl hover:bg-gray-500 transition duration-300"
          >
            <FcGoogle className="text-4xl" />
            <span className="font-bold text-black">Sign in with Google</span>
          </button>
        </motion.div>
      </div>
    </div>
    //   </div>
    // </div>
  );
};

export default LoginForm;
