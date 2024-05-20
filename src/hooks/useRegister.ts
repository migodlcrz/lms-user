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
  //   const [error, setError] = useState(null);
  //   const [isLoading, setIsLoading] = useState<boolean>(false);
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
    const response = await fetch(
      "http://localhost:4000/api/user/register/google",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(bodyRequest),
      }
    );

    const json = await response.json();

    if (response.ok) {
      toast.success(json.message);
      navigate("/login");
    }

    if (!response.ok) {
      toast.error(json.error);
      navigate("/login");
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
