import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartServiceObj from "./cart.service";
import { resetCart } from "../../../reducers/cart.reducers";

export const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    if (state.Cart.cart) {
      return state.Cart.cart;
    }
  });

  const placeOrder = useCallback(async () => {
    try {
      let orderDetails = await CartServiceObj.placeOrder(cart);
      dispatch(resetCart());
      toast.success(
        "Your order has been placed successfully. You will be confirmed by our representative."
      );
      navigate("/shop");
      //   console.log(orderDetails);
      //   console.log(cart);
    } catch (error) {
      toast.warn("Something went wrong. Please try again later.");
      //   navigate("/cart");
    }
  }, [cart]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      if (cart) {
        placeOrder();
      }
    } else {
      toast.warn("Please login to place order.");
      navigate("/login");
    }
  }, [cart]);
  return <div className="nav-margin">Loading...</div>;
};
