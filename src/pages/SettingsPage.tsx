import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SettingsPage = () => {
  const { user } = useAuthContext();
  const port = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const { logout } = useLogout();

  const deleteUser = async () => {
    const response = await fetch(`${port}/api/user/delete/${user.user_._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (!response.ok) {
      return toast.error(json.error);
    }

    toast.success(json.message);
    logout();
  };

  // console.log("USER: ", user.user_._id);
  return (
    <div className="flex flex-col space-y-2 bg-gray-50 h-screen w-full p-10">
      <div>Name: {user.user_.name}</div>
      <div>Email: {user.user_.email}</div>
      <button
        onClick={() => {
          logout();
        }}
        className="btn bg-black text-white font-bold"
      >
        Logout
      </button>
      <button
        onClick={() => {
          deleteUser();
        }}
        className="btn bg-red-600 text-white font-bold"
      >
        Delete Account
      </button>
    </div>
  );
};

export default SettingsPage;
