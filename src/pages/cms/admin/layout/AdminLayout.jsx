import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AdminHeader } from "../component/AdminHeader";
import { AdminSidebar } from "../component/AdminSidebar";
import { AdminFooter } from "../component/AdminFooter";
import { useDispatch } from "react-redux";
import { getLoggedInUser } from "../../../../reducers/user.reducers";

export const AdminLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("token") ?? null;
    if (token) {
      dispatch(getLoggedInUser());
    }
  }, []);
  return (
    <>
      <AdminHeader />

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
