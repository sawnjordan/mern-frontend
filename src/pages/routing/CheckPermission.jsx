import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthServiceObj from "../home/auth/auth.service";

export const CheckPermission = ({ Component, role }) => {
  // let loggedInUser = {
  //   role: "admin",
  // };
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState();
  const [loading, setLoading] = useState(true);
  const loadLoggedInUser = async () => {
    try {
      let response = await AuthServiceObj.getLoggedInUser();
      if (!response) {
        toast.error("Please login first.");
        navigate("/login");
      } else {
        setLoggedInUser(response?.data?.data);
        console.log(response);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first.");
      navigate("/login");
    } else {
      loadLoggedInUser();
    }
  }, []);

  if (loading) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  } else {
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
  }
};
