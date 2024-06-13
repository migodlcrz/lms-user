import { jwtDecode } from "jwt-decode";
import React, {
  FC,
  useReducer,
  createContext,
  ReactNode,
  useEffect,
} from "react";

interface AuthState {
  user: any;
  isLoading: boolean;
}

interface AuthAction {
  type: string;
  payload?: any;
}

interface AuthContextProps {
  user: any;
  isLoading: boolean;
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: true,
  });

  const checkTier = async () => {
    console.log("USER EMAIL: ", state.user && state.user.user_.email);
    const port = process.env.REACT_APP_URL;
    const response = await fetch(`${port}/api/subs/tier`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: state.user && state.user.user_.email,
      }),
    });

    const json = await response.json();

    console.log("USER: ", json);
  };

  useEffect(() => {
    const user: string | null = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    const token: string | null = JSON.parse(
      localStorage.getItem("user-token") || "null"
    );

    if (!user || !token) {
      dispatch({ type: "LOGOUT" });
    }

    try {
      const decodedToken: any = jwtDecode(token!);

      // checkToken();
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      } else {
        // console.log("PAYLOAD: ", user);
        dispatch({ type: "LOGIN", payload: user });
      }
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  useEffect(() => {
    if (state.user) {
      checkTier();
    }
  }, [state]);

  // console.log("Auth Context State: ", state);

  // console.log("USER: ", state.user && state.user.user_.email);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {state.isLoading ? (
        <div className="grid w-full h-screen place-items-center">
          <p className="text-black font-bold text-2xl">Loading...</p>
        </div> //
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
