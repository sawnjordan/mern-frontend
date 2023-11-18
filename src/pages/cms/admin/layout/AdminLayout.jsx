import React, { useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { AdminHeader } from "../component/AdminHeader";
import { AdminSidebar } from "../component/AdminSidebar";
import { AdminFooter } from "../component/AdminFooter";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser } from "../../../../reducers/user.reducers";
import { io } from "socket.io-client";

export const AdminLayout = () => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState([]);
  const loggedInUser = useSelector((state) => {
    return state?.User?.loggedInUser;
  });
  useEffect(() => {
    let token = localStorage.getItem("token") ?? null;
    if (token) {
      dispatch(getLoggedInUser());
      const newSocket = io("http://localhost:3005");
      setSocket(newSocket);
      return () => {
        newSocket.disconnect(); // Cleanup the socket when the component unmounts.
      };
    }
  }, []);

  useEffect(() => {
    if (socket && loggedInUser) {
      socket?.emit("joinAdminRoom");
      socket?.emit("newAdminUser", loggedInUser?.name);
      socket?.on("test", (data) => {
        console.log(data);
      });
    }
  }, [socket, loggedInUser]);

  const handleMarkAsRead = () => {
    // Clear notifications when "Mark as Read" is clicked
    setNotification([]);
  };

  useEffect(() => {
    socket?.on("getOrderNotification", (data) => {
      setNotification((prev) => [...prev, data]);
    });
  }, [socket]);
  console.log(notification, "in layout");
  return (
    <>
      <AdminHeader
        notification={notification}
        onMarkAsRead={handleMarkAsRead}
      />

      <div id="layoutSidenav">
        <AdminSidebar />
        <div id="layoutSidenav_content">
          <main>
            <Outlet />
          </main>
          <AdminFooter />
        </div>
      </div>
    </>
  );
};
