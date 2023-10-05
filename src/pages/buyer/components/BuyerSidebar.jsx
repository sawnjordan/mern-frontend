import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export const BuyerSidebar = () => {
  const loggedInUser = useSelector((state) => {
    return state.User?.loggedInUser;
  });
  console.log(loggedInUser);
  return (
    <aside className="col-lg-4 pt-4 pt-lg-0 pe-xl-5">
      <div className="bg-white rounded-3 shadow-lg pt-1 mb-5 mb-lg-0">
        <div className="d-md-flex justify-content-between align-items-center text-center text-md-start p-4">
          <div className="d-md-flex align-items-center">
            <div
              className="img-thumbnail rounded-circle position-relative flex-shrink-0 mx-auto mb-2 mx-md-0 mb-md-0"
              style={{ width: "6.375rem" }}
            >
              {/* <span
                className="badge bg-warning position-absolute end-0 mt-n2"
                data-bs-toggle="tooltip"
                data-bs-original-title="Reward points"
              >
                384
              </span> */}
              <img
                className="img img-fluid rounded-circle"
                src={`${import.meta.env.VITE_IMAGE_URL}/users/${
                  loggedInUser?.image
                }`}
                alt={loggedInUser?.name}
              />
            </div>
            <div className="ps-md-3">
              <h3 className="fs-base mb-0">{loggedInUser?.name}</h3>
              <span className="text-accent fs-sm">{loggedInUser?.email}</span>
            </div>
          </div>
          <a
            className="btn btn-primary d-lg-none mb-2 mt-3 mt-md-0"
            href="#account-menu"
            data-bs-toggle="collapse"
            aria-expanded="false"
          >
            <i className="ci-menu me-2"></i>Account menu
          </a>
        </div>
        <div className="d-lg-block collapse" id="account-menu">
          <div className="bg-primary-l1 px-4 py-3">
            <h3 className="fs-sm mb-0 text-white">Dashboard</h3>
          </div>
          <ul className="list-unstyled mb-0">
            <li className="border-bottom mb-0">
              <NavLink
                className="text-dark d-flex align-items-center px-4 py-3"
                to="/buyer/orders"
              >
                <i className="ci-bag opacity-60 me-2"></i>Orders
                <span className="fs-sm text-muted ms-auto">1</span>
              </NavLink>
            </li>
            <li className="border-bottom mb-0">
              <NavLink
                className="text-dark d-flex align-items-center px-4 py-3"
                to="/buyer/wishlist"
              >
                <i className="ci-heart opacity-60 me-2"></i>Wishlist
                <span className="fs-sm text-muted ms-auto">3</span>
              </NavLink>
            </li>
          </ul>
          <div className="bg-primary-l1 px-4 py-3">
            <h3 className="fs-sm mb-0 text-white">Account settings</h3>
          </div>
          <ul className="list-unstyled mb-0">
            <li className="border-bottom mb-0">
              <NavLink
                className="text-dark d-flex align-items-center px-4 py-3"
                to="/buyer"
              >
                <i className="ci-user opacity-60 me-2"></i>Profile info
              </NavLink>
            </li>
            {/* <li className="border-bottom mb-0">
              <NavLink
                className="text-dark d-flex align-items-center px-4 py-3 active"
                to="/buyer/address"
              >
                <i className="ci-location opacity-60 me-2"></i>Addresses
              </NavLink>
            </li> */}
            <li className="mb-0">
              <NavLink
                className="text-dark d-flex align-items-center px-4 py-3"
                to="/buyer/password-change"
              >
                <i className="ci-card opacity-60 me-2"></i>Change Password
              </NavLink>
            </li>
            <li className="mb-0">
              <NavLink
                className="text-dark d-flex align-items-center px-4 py-3"
                to="/buyer/payment"
              >
                <i className="ci-card opacity-60 me-2"></i>Payment methods
              </NavLink>
            </li>
            <li className="d-lg-none border-top mb-0">
              <a
                className="text-dark d-flex align-items-center px-4 py-3"
                href="account-signin.html"
              >
                <i className="ci-sign-out opacity-60 me-2"></i>Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};
