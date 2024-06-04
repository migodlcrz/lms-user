import { useGoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSignUp } from "../hooks/useRegister";

interface RegForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const [regForm, setRegForm] = useState<RegForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [seePassword, setSeePassword] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const { signup, googleSignUp } = useSignUp();

  const navigate = useNavigate();

  const clearForm = () => {
    setRegForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  const changeHandler = (field: string, value: string) => {
    setRegForm({ ...regForm, [field]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signup(regForm);
      clearForm();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleRegister = useGoogleLogin({
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

        // console.log(json.given_name);
        // console.log(json.family_name);
        // console.log(json.email);
        // console.log(json.sub);
        googleSignUp(json.given_name, json.family_name, json.email, json.sub);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div
      className="flex flex-col h-full justify-center px-40 bg-slate-50"
      data-testid="register-page"
    >
      {/* <div className="grid place-items-center h-screen bg-cream"> */}
      {/* <div className="bg-white shadow-lg p-5 min-w-[60%] border-t-4 border-harvest_gold"> */}
      <div className="flex flex-row">
        <button
          onClick={() => {
            // router.push("/");
            navigate("/");
          }}
          className="text-4xl text-oslo_gray hover:text-harvest_gold-300
          "
        >
          <MdKeyboardArrowLeft />
        </button>
        <h1 className="text-xl font-bold my-4 text-center">
          Register your account!
        </h1>
      </div>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
        <div className="flex flex-row w-full space-x-2">
          <input
            type="text"
            placeholder="First Name"
            className="input-md border-oslo_gray border-2 shadow-md rounded-xl w-1/2 bg-white"
            value={regForm.firstName}
            onChange={(e) => {
              changeHandler("firstName", e.target.value);
            }}
            data-testid="first-name-register-field"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="input-md border-oslo_gray border-2 shadow-md rounded-xl w-1/2 bg-white"
            value={regForm.lastName}
            onChange={(e) => {
              changeHandler("lastName", e.target.value);
            }}
            data-testid="last-name-register-field"
          />
        </div>
        <input
          type="text"
          placeholder="Email"
          className="input-md border-oslo_gray border-2 shadow-md rounded-xl bg-white"
          value={regForm.email}
          onChange={(e) => {
            changeHandler("email", e.target.value);
          }}
          data-testid="email-register-field"
        />
        <input
          type={seePassword ? "text" : "password"}
          placeholder="Password"
          className="input-md border-oslo_gray border-2 shadow-md rounded-xl bg-white"
          value={regForm.password}
          onChange={(e) => {
            changeHandler("password", e.target.value);
          }}
          data-testid="password-register-field"
        />
        <div className="flex flex-row items-center text-sm">
          <input
            type="checkbox"
            className="checkbox checkbox-xs mr-2 border-oslo_gray"
            onClick={() => {
              setSeePassword(!seePassword);
            }}
          />
          <p>Show Password</p>
        </div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
          <button
            className="btn bg-gradient-to-r from-harvest_gold-400 to-harvest_gold-600 shadow-xl text-white font-bold cursor-pointer py-2 hover:bg-harvest_gold-300 hover:text-slate-200 w-full rounded-xl"
            data-testid="register-button"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <span className="text-lg lg:text-md text-black font-bold">
                Register
              </span>
            )}
          </button>
        </motion.div>
      </form>
      <div className="w-full text-start mt-2 text-sm lg;text-md">
        <button
          className="text-sm mt-3 text-center"
          onClick={() => navigate("/login")}
        >
          {"Already have an account?"}{" "}
          <span className="text-oslo_gray-700 hover:text-oslo_gray-900 font-bold">
            Login
          </span>
        </button>
      </div>
      <div className="flex justify-center items-center w-full gap-3 py-3">
        <div className="border-b-2 border-oslo_gray-800 py-2 w-full px-6"></div>
        <div className="mt-3 text-oslo_gray-800">or</div>
        <div className="border-b-2 border-oslo_gray-800 py-2 w-full px-6"></div>
      </div>
      <div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
          <button
            onClick={() => handleGoogleRegister()}
            className="flex flex-row items-center justify-center space-x-4 border-[0.5px] border-black w-full p-2 rounded-xl hover:bg-gray-500 transition duration-300"
            data-testid="google-login-button"
          >
            <FcGoogle className="text-4xl" />
            <span className="font-bold text-black">Register with Google</span>
          </button>
        </motion.div>
      </div>

      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default RegisterForm;
