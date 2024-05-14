import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const SettingsPage = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  return (
    <div className="flex flex-col space-y-2 bg-white h-screen w-full p-10">
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
      <button
        onClick={() => {
          logout();
        }}
        className="btn"
      >
        Logout
      </button>
    </div>
  );
};

export default SettingsPage;
