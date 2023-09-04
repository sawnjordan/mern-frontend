import React from "react";
import { useNavigate } from "react-router-dom";
import AuthServiceObj from "../../../home/auth/auth.service";
import { toast } from "react-toastify";

export const AdminHeader = () => {
  const navigate = useNavigate();
  const toggleSidebar = (e) => {
    e.preventDefault();
    document.body.classList.toggle("sb-sidenav-toggled");
  };

  const handleLogout = async (e) => {
    try {
      e.preventDefault();

      let response = await AuthServiceObj.logoutUser();
      console.log(response);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      toast.success("Successfully logged out.");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand ps-3" href="index.html">
          Start Bootstrap
        </a>
        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          href="#!"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars"></i>
        </button>
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
            />
            <button
              className="btn btn-primary"
              id="btnNavbarSearch"
              type="button"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>

        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw"></i>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <a className="dropdown-item" href="#!">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#!">
                  Activity Log
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={handleLogout}
                  href="/login"
                >
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
};
