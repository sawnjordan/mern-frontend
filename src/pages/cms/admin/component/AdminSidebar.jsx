import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export const AdminSidebar = () => {
  // let user = localStorage.getItem("user");
  // const userData = JSON.parse(user);
  const userData = useSelector((state) => {
    // console.log(state);
    return state.User?.loggedInUser;
  });
  return (
    <>
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Core</div>
              <a className="nav-link" href="/">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Dashboard
              </a>
              <div className="sb-sidenav-menu-heading">Features</div>
              <a
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseLayouts"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-columns"></i>
                </div>
                Layouts
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                className="collapse"
                id="collapseLayouts"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <a className="nav-link" href="layout-static.html">
                    Static Navigation
                  </a>
                  <a className="nav-link" href="layout-sidenav-light.html">
                    Light Sidenav
                  </a>
                </nav>
              </div>
              <NavLink className="nav-link" to="/admin/banner">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-chart-area"></i>
                </div>
                Banner Manage
              </NavLink>
              <NavLink className="nav-link" to="/admin/brand">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-chart-area"></i>
                </div>
                Brand Manage
              </NavLink>
              <NavLink className="nav-link" to="/admin/category">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-chart-area"></i>
                </div>
                Category Manage
              </NavLink>
              <NavLink className="nav-link" to="/admin/user">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-chart-area"></i>
                </div>
                Users Manage
              </NavLink>
              <NavLink className="nav-link" to="/admin/product">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-chart-area"></i>
                </div>
                Product Manage
              </NavLink>
              <NavLink className="nav-link" to="/">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-chart-area"></i>
                </div>
                Order Manage
              </NavLink>
              <NavLink className="nav-link" to="/">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-chart-area"></i>
                </div>
                Transactions Manage
              </NavLink>
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            {userData?.name}
          </div>
        </nav>
      </div>
    </>
  );
};
