import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./reducers/user.reducers";
import cartReducers from "./reducers/cart.reducers";

export const store = configureStore({
  reducer: {
    User: userReducers,
    Cart: cartReducers,
  },
});
