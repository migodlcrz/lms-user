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
  isLoading: boolean; // Add isLoading state
}

interface AuthAction {
  type: string;
  payload?: any;
}

interface AuthContextProps {
  user: any;
  isLoading: boolean; // Add isLoading state
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
        isLoading: false, // Set isLoading to false after login
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLoading: false, // Set isLoading to false after logout
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
    isLoading: true, // Initialize isLoading to true
  });

  useEffect(() => {
    const user: string | null = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    } else {
      dispatch({ type: "LOGOUT" }); // If there's no user, set isLoading to false
    }
  }, []);

  console.log("Auth Context State: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {state.isLoading ? (
        <div className="grid w-full h-screen place-items-center">
          <p className="text-black font-bold text-2xl">Loading...</p>
        </div> // Render loading indicator while fetching user data
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
