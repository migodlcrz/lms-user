import React, {
  FC,
  useReducer,
  createContext,
  ReactNode,
  useEffect,
  useState,
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

  useEffect(() => {
    const user: string | null = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    } else {
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  console.log("Auth Context State: ", state);

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
