import React, { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { useDispatch } from "react-redux";
import { getLoggedInUser } from "../../../reducers/user.reducers";
import { SellerSidebar } from "../components/SellerSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { getUserWishlist } from "../../../reducers/wishlist.reducers";
import { updateCart } from "../../../reducers/cart.reducers";
import { SellerPageHeader } from "../components/SellerPageHeader";
import { getSellerProducts } from "../../../reducers/seller.reducers";

export const SellerLayout = () => {
  const location = useLocation();
  const [breadcrumb, setBreadcrumb] = useState({ title: null, link: null });
  const [prodCount, setProdCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("token") ?? null;
    if (token) {
      dispatch(getLoggedInUser());
      dispatch(getUserWishlist());
      dispatch(updateCart());
      dispatch(getSellerProducts());
    }
  }, []);

  const updateBreadcrumb = () => {
    const pathname = location.pathname;
    if (pathname === "/seller") {
      setBreadcrumb({
        title: "My Profile",
        link: "Profile",
        text: "Update you profile details below:",
      });
    } else if (pathname === "/seller/orders") {
      setBreadcrumb({
        title: "My Orders",
        link: "Orders",
        text: "List of your orders:",
      });
    } else if (pathname === "/seller/wishlist") {
      setBreadcrumb({
        title: "My Wishlist",
        link: "Wishlist",
        text: "List of items you added to wishlist:",
      });
    } else if (pathname === "/seller/products") {
      setBreadcrumb({
        title: "My Products",
        link: "Products",
        text: "List of your products.",
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
      <SellerPageHeader breadcrumb={breadcrumb} />
      <div className="container pb-5 mb-2 mb-md-4">
        <div className="row">
          <SellerSidebar />
          <Outlet context={{ breadcrumb }} />
        </div>
      </div>
    </div>
  );
};
