import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useSignUp } from "../hooks/useRegister";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

interface RegForm {
  name: string;
  email: string;
  password: string;
}

interface GoogleCred {
  name: string;
  email: string;
}

const RegisterForm = () => {
  const [regForm, setRegForm] = useState<RegForm>({
    name: "",
    email: "",
    password: "",
  });
  const [seePassword, setSeePassword] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const { signup, googleSignUp } = useSignUp();

  const navigate = useNavigate();

  const clearForm = () => {
    setRegForm({
      name: "",
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

  return (
    <div className="flex flex-col h-full justify-center px-40">
      {/* <div className="grid place-items-center h-screen bg-cream"> */}
      {/* <div className="bg-white shadow-lg p-5 min-w-[60%] border-t-4 border-harvest_gold"> */}
      <div className="flex flex-row">
        <button
          onClick={() => {
            // router.push("/");
            navigate("/");
          }}
          className="text-4xl text-caribbean hover:text-harvest_gold-300
          "
        >
          <MdKeyboardArrowLeft />
        </button>
        <h1 className="text-xl font-bold my-4 text-center">
          Register your account!
        </h1>
      </div>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Full Name"
          className="input-md border-caribbean border-2 shadow-md rounded-xl"
          data-testid=""
          value={regForm.name}
          onChange={(e) => {
            changeHandler("name", e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Email"
          className="input-md border-caribbean border-2 shadow-md rounded-xl"
          data-testid=""
          value={regForm.email}
          onChange={(e) => {
            changeHandler("email", e.target.value);
          }}
        />
        <input
          type={seePassword ? "text" : "password"}
          placeholder="Password"
          className="input-md border-caribbean border-2 shadow-md rounded-xl"
          data-testid=""
          value={regForm.password}
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
          />
          <p>Show Password</p>
        </div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
          <button className="btn bg-gradient-to-b from-caribbean-500 to-caribbean-600 text-white font-bold cursor-pointer py-2 hover:bg-harvest_gold-300 hover:text-slate-200 w-full rounded-xl">
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
        <a className="text-sm mt-3 text-center" href={"/login"}>
          {"Already have an account?"}{" "}
          <span className="text-caribbean-700 hover:text-caribbean-900 font-bold">
            Login
          </span>
        </a>
      </div>
      <div className="flex justify-center items-center w-full gap-3 py-3">
        <div className="border-b-2 border-caribbean-800 py-2 w-full px-6"></div>
        <div className="mt-3 text-caribbean-800">or</div>
        <div className="border-b-2 border-caribbean-800 py-2 w-full px-6"></div>
      </div>
      <div className="flex w-full justify-center my-3">
        <GoogleLogin
          shape="square"
          width={400}
          size="large"
          theme="outline"
          onSuccess={(credentialResponse) => {
            if (credentialResponse && credentialResponse.credential) {
              const user: GoogleCred = jwtDecode(credentialResponse.credential);
              googleSignUp(
                user.name,
                user.email,
                credentialResponse.credential
              );
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>

      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default RegisterForm;
