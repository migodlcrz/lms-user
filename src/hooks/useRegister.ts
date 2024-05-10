import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface RegForm {
  name: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  //   const [error, setError] = useState(null);
  //   const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const googleSignUp = async (name: string, email: string, token: string) => {
    const bodyData = {
      name: name,
      email: email,
      token: token,
    };

    const response = await fetch(
      "http://localhost:4000/api/user/register/google",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }
    );

    const json = await response.json();

    if (response.ok) {
      toast.success(json.message);
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      navigate("/login");
    }

    if (!response.ok) {
      toast.error(json.error);
    }
  };

  const signup = async (regForm: RegForm) => {
    // setIsLoading(true);
    // setError(null);

    console.log("PUMASOK", regForm);

    const response = await fetch("http://localhost:4000/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regForm),
    });

    const json = await response.json();

    if (!response.ok) {
      toast.error(json.error);
    }

    if (response.ok) {
      toast.success(json.message);
      dispatch({ type: "LOGIN", payload: json });
      navigate("/login");
    }
  };

  return { signup, googleSignUp };
};
