import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface RegForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  const port = process.env.REACT_APP_URL;
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const googleSignUp = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    const bodyRequest = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    const response = await fetch(`${port}/api/user/register/google`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
    });

    const json = await response.json();

    if (response.ok) {
      toast.success(json.message);
      navigate("/login");
    }

    if (!response.ok) {
      try {
        const response = await fetch(`${port}/api/user/login/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const json = await response.json();

        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(json));
          localStorage.setItem("user-token", JSON.stringify(json.token));

          toast.success(json.message);
          dispatch({ type: "LOGIN", payload: json });
          navigate("/dashboard");
        } else {
          console.log("ERROR");
          // navigate("/register");
          // await googleSignUp(firstName, lastName, email, password);
        }
      } catch (error) {
        toast.error("An error occurred while logging in.");
        console.error("Login error:", error);
      }
    }
  };

  const signup = async (regForm: RegForm) => {
    // setIsLoading(true);
    // setError(null);

    console.log("PUMASOK", regForm);

    const response = await fetch(`${port}/api/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regForm),
    });

    const json = await response.json();

    if (!response.ok) {
      toast.error(json.error);
      navigate("/login");
    }

    if (response.ok) {
      toast.success(json.message);
      // dispatch({ type: "LOGIN", payload: json });
      navigate("/login");
    }
  };

  return { signup, googleSignUp };
};
