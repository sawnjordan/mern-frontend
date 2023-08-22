import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export const CheckPermission = ({ Component, role }) => {
  let loggedInUser = {
    role: "admin",
  };

  if (loggedInUser && loggedInUser.role === role) {
    return Component;
  } else {
    toast.warn("You are not allowed to access the resources.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return <Navigate to={"/" + loggedInUser.role}></Navigate>;
  }
};
