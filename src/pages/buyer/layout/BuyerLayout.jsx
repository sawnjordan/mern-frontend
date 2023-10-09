import React, { useEffect } from "react";
import { Header } from "../../../components/Header";
import { useDispatch } from "react-redux";
import { getLoggedInUser } from "../../../reducers/user.reducers";
import { BuyerPageHeader } from "../components/BuyerPageHeader";
import { BuyerSidebar } from "../components/BuyerSidebar";
import { Outlet } from "react-router-dom";
import { getUserWishlist } from "../../../reducers/wishlist.reducers";

export const BuyerLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("token") ?? null;
    if (token) {
      dispatch(getLoggedInUser());
      dispatch(getUserWishlist());
    }
  }, []);
  return (
    <div className="nav-margin">
      <Header />
      <BuyerPageHeader />
      <div className="container pb-5 mb-2 mb-md-4">
        <div className="row">
          <BuyerSidebar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
