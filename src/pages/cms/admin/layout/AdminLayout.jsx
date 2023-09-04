import React from "react";
import { Outlet } from "react-router-dom";
import { AdminHeader } from "../component/AdminHeader";
import { AdminSidebar } from "../component/AdminSidebar";
import { AdminFooter } from "../component/AdminFooter";

export const AdminLayout = () => {
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
