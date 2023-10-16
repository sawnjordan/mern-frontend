import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./reducers/user.reducers";
import cartReducers from "./reducers/cart.reducers";
import wishlistReducers from "./reducers/wishlist.reducers";
import orderReducers from "./reducers/order.reducers";
import sellerReducers from "./reducers/seller.reducers";

export const store = configureStore({
  reducer: {
    User: userReducers,
    Cart: cartReducers,
    Wishlist: wishlistReducers,
    Order: orderReducers,
    Seller: sellerReducers,
  },
});
