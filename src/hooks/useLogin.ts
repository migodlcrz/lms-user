import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "./useRegister";

interface LoginForm {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { signup, googleSignUp } = useSignUp();
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const googleLogin = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/user/login/google",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));
        localStorage.setItem("user-token", JSON.stringify(json.token));

        toast.success(json.message);
        dispatch({ type: "LOGIN", payload: json });
        navigate("/dashboard");
      } else {
        // navigate("/register");
        await googleSignUp(firstName, lastName, email, password);
      }
    } catch (error) {
      toast.error("An error occurred while logging in.");
      console.error("Login error:", error);
    }
  };

  const login = async (logForm: LoginForm) => {
    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logForm),
    });

    const json = await response.json();

    if (!response.ok) {
      toast.error(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      localStorage.setItem("token", JSON.stringify(json.token));
      toast.success(json.message);
      dispatch({ type: "LOGIN", payload: json });
      navigate("/dashboard");
    }
  };

  return { googleLogin, login };
};
