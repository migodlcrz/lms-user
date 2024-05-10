"use client";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
// import { useLogin } from "../hooks/useLogin";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useLogin } from "../hooks/useLogin";
import { useGoogleLogin } from "@react-oauth/google";

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
      // clearForm();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Login">
      <div className="grid place-items-center h-screen bg-cream">
        <div className="bg-white shadow-lg p-5 min-w-[60%] border-t-4 border-harvest_gold">
          <div className="flex flex-row ">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="text-4xl text-harvest_gold hover:text-cerulean-300
          "
            >
              <MdKeyboardArrowLeft />
            </button>
            <h1 className="text-xl font-bold my-4 text-center text-black">
              Login
            </h1>
          </div>
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Email"
              className="input-md"
              data-testid=""
              value={loginForm.email}
              onChange={(e) => {
                changeHandler("email", e.target.value);
              }}
            />
            <input
              type={seePassword ? "text" : "password"}
              placeholder="Password"
              className="input-md"
              data-testid=""
              value={loginForm.password}
              onChange={(e) => {
                changeHandler("password", e.target.value);
              }}
            />
            <div className="text-sm">
              <input
                type="checkbox"
                className="checkbox checkbox-xs mr-2"
                onClick={() => {
                  setSeePassword(!seePassword);
                }}
              />{" "}
              Show Password
            </div>
            <button
              onClick={() => {
                // setLoading(true);
              }}
              className="btn bg-harvest_gold text-white font-bold cursor-pointer py-2 hover:bg-harvest_gold-300 hover:text-slate-200 w-full rounded-none"
              data-testid=""
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <span className="text-black font-bold">Login</span>
              )}
            </button>
          </form>
          <div className="flex justify-center items-center w-full gap-3 py-3">
            <div className="border-b-2 border-cerulean py-2 w-full px-6"></div>
            <div className="mt-3 text-cerulean">or</div>
            <div className="border-b-2 border-cerulean py-2 w-full px-6"></div>
          </div>
          <div className="flex w-full justify-center my-3">
            <GoogleLogin
              shape="square"
              width={400}
              size="large"
              theme="outline"
              onSuccess={(credentialResponse) => {
                if (credentialResponse && credentialResponse.credential) {
                  const user: any = jwtDecode(credentialResponse.credential);
                  googleLogin(
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
          <div className="w-full text-center">
            <a className="text-sm mt-3 text-center" href={"/register"}>
              {"Don't have an account?"}{" "}
              <span className="text-cerulean hover:text-emerald-500">
                Register
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
