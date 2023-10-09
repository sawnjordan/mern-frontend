import React, { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { useDispatch } from "react-redux";
import { getLoggedInUser } from "../../../reducers/user.reducers";
import { BuyerPageHeader } from "../components/BuyerPageHeader";
import { BuyerSidebar } from "../components/BuyerSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { getUserWishlist } from "../../../reducers/wishlist.reducers";
import { updateCart } from "../../../reducers/cart.reducers";

export const BuyerLayout = () => {
  const location = useLocation();
  const [breadcrumb, setBreadcrumb] = useState({ title: null, link: null });
  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("token") ?? null;
    if (token) {
      dispatch(getLoggedInUser());
      dispatch(getUserWishlist());
      dispatch(updateCart());
    }
  }, []);

  const updateBreadcrumb = () => {
    const pathname = location.pathname;
    if (pathname === "/customer") {
      setBreadcrumb({
        title: "My Profile",
        link: "Profile",
        text: "Update you profile details below:",
      });
    } else if (pathname === "/customer/orders") {
      setBreadcrumb({
        title: "My Orders",
        link: "Orders",
        text: "List of your orders:",
      });
    } else if (pathname === "/customer/wishlist") {
      setBreadcrumb({
        title: "My Wishlist",
        link: "Wishlist",
        text: "List of items you added to wishlist:",
      });
    }
  };
  useEffect(() => {
    updateBreadcrumb();
  }, [location.pathname]);
  // console.log(location, "herer");
  return (
    <div className="nav-margin">
      <Header />
      <BuyerPageHeader breadcrumb={breadcrumb} />
      <div className="container pb-5 mb-2 mb-md-4">
        <div className="row">
          <BuyerSidebar />
          <Outlet context={{ breadcrumb }} />
        </div>
      </div>
    </div>
  );
};
