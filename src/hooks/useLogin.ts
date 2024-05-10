import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const googleLogin = async (name: string, email: string, token: string) => {
    const bodyData = {
      name: name,
      email: email,
      token: token,
    };

    const response = await fetch(
      "http://localhost:4000/api/user/login/google",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      }
    );

    const json = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      localStorage.setItem("token", JSON.stringify(json.token));

      toast.success(json.message);
      dispatch({ type: "LOGIN", payload: json });
      navigate("/dashboard");
    }

    if (!response.ok) {
      toast.error(json.error);
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
