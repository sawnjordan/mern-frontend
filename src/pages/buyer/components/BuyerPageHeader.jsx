import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export const BuyerPageHeader = ({ breadcrumb }) => {
  const loggedInUser = useSelector((state) => {
    return state?.User?.loggedInUser;
  });
  return (
    <div className="page-title-overlap bg-dark pt-4">
      <div className="container d-lg-flex justify-content-between py-2 py-lg-3">
        <div className="order-lg-2 mb-3 mb-lg-0 pt-lg-2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-light flex-lg-nowrap justify-content-center justify-content-lg-start">
              <li className="breadcrumb-item">
                <a className="text-nowrap" href="index.html">
                  <i className="ci-home"></i>Home
                </a>
              </li>
              <li className="breadcrumb-item text-nowrap">
                <NavLink to={`/${loggedInUser?.role}`}>Account</NavLink>
              </li>
              <li
                className="breadcrumb-item text-nowrap active"
                aria-current="page"
              >
                {breadcrumb?.link}
              </li>
            </ol>
          </nav>
        </div>
        <div className="order-lg-1 pe-lg-4 text-center text-lg-start">
          <h1 className="h3 text-light mb-0">{breadcrumb?.title}</h1>
        </div>
      </div>
    </div>
  );
};
