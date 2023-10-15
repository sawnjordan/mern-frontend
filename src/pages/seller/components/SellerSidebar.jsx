import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { OrderServiceObj } from "../../cms/admin/order";
import { FaEnvelope } from "react-icons/fa";

export const SellerSidebar = ({ prodCount }) => {
  const [loading, setLoading] = useState(true);
  const [totalOrders, setTotalOrders] = useState();
  const loggedInUser = useSelector((state) => {
    return state.User?.loggedInUser;
  });
  const wishlist = useSelector((state) => {
    if (state?.Wishlist) {
      return state.Wishlist?.wishlist;
    }
  });

  const getMyOrders = async () => {
    try {
      let response = await OrderServiceObj.getMyOrders();
      // console.log(response);
      let orderData = response.data?.data?.length;
      setTotalOrders(orderData);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  // console.log(totalOrders);
  useEffect(() => {
    getMyOrders();
  }, []);
  // console.log(wishlist);
  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        <>
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
                    <p className="text-accent fs-sm mt-2 fst-italic">
                      <FaEnvelope className="me-2" /> {loggedInUser?.email}
                    </p>
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
                  <h4 className="fs-sm mb-0 text-white">Account</h4>
                </div>
                <ul className="list-unstyled mb-0">
                  <li className="border-bottom mb-0">
                    <NavLink
                      className="text-dark d-flex align-items-center px-4 py-3"
                      to="/seller"
                    >
                      <i className="ci-user opacity-60 me-2"></i>Profile
                      Settings
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
                      to="/seller/password-change"
                    >
                      <i className="ci-card opacity-60 me-2"></i>Change Password
                    </NavLink>
                  </li>
                  <li className="mb-0">
                    <NavLink
                      className="text-dark d-flex align-items-center px-4 py-3"
                      to="/seller/payment"
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
                <div className="bg-primary-l1 px-4 py-3">
                  <h4 className="fs-sm mb-0 text-white">Dashboard</h4>
                </div>
                <ul className="list-unstyled mb-0">
                  <li className="border-bottom mb-0">
                    <NavLink
                      className="text-dark d-flex align-items-center px-4 py-3"
                      to="/seller/products"
                    >
                      <i className="ci-bag opacity-60 me-2"></i>Products
                      <span className="fs-sm text-muted ms-auto">
                        {prodCount}
                      </span>
                    </NavLink>
                  </li>
                  <li className="border-bottom mb-0">
                    <NavLink
                      className="text-dark d-flex align-items-center px-4 py-3"
                      to="/seller/orders"
                    >
                      <i className="ci-bag opacity-60 me-2"></i>Orders
                      <span className="fs-sm text-muted ms-auto">
                        {totalOrders}
                      </span>
                    </NavLink>
                  </li>
                  <li className="border-bottom mb-0">
                    <NavLink
                      className="text-dark d-flex align-items-center px-4 py-3"
                      to="/seller/wishlist"
                    >
                      <i className="ci-heart opacity-60 me-2"></i>Wishlist
                      <span className="fs-sm text-muted ms-auto">
                        {wishlist?.wishlist.length}
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
};
