import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-responsive-modal";

const SettingsPage = () => {
  const { user } = useAuthContext();
  const port = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const { logout } = useLogout();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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
    <>
      <div className="flex flex-col space-y-2 bg-gray-50 h-screen w-full p-10">
        <div>Name: {user.user_.name}</div>
        <div>Email: {user.user_.email}</div>
        <button
          onClick={() => {
            logout();
          }}
          className="btn bg-black text-white font-bold"
          data-testid="logout-button"
        >
          Logout
        </button>
        <button
          onClick={() => {
            setOpenDeleteModal(true);
          }}
          className="btn bg-red-600 text-white font-bold"
          data-testid="delete-account"
        >
          Delete Account
        </button>
      </div>
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        center
        closeOnEsc
        classNames={{
          modal: "customModalClass",
        }}
        data-testid="delete-account"
      >
        <div className="flex flex-col mt-10 space-y-2 w-[48rem] items-center justify-center">
          <h2 className="text-black text-2xl font-bold w-full text-center">
            Are you sure you want to delete your account?
          </h2>
          <div className="flex flex-row justify-evenly w-full">
            <button
              onClick={() => setOpenDeleteModal(false)}
              className="btn text-black text-2xl font-semibold "
              data-testid="cancel"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setOpenDeleteModal(false);
                deleteUser();
              }}
              className="btn bg-black text-white text-2xl font-semibold bg-fuchsia border-fuchsia hover:bg-red-600 hover:border-red-600 shadow-md"
              data-testid="proceed"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SettingsPage;
