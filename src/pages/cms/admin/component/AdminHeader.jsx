import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../../reducers/user.reducers";

export const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleSidebar = (e) => {
    e.preventDefault();
    document.body.classList.toggle("sb-sidenav-toggled");
  };

  const userDetails = useSelector((state) => {
    return state.User?.loggedInUser;
  });

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      dispatch(logoutUser());
      toast.success("Logged out.");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <NavLink className="navbar-brand ps-3" to="/">
          Home/Landing Page
        </NavLink>
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
              {userDetails ? (
                userDetails?.name
              ) : (
                <i className="fas fa-user fa-fw"></i>
              )}
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
                <a className="dropdown-item" onClick={handleLogout}>
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
