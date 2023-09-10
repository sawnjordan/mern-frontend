import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./reducers/user.reducers";

export const store = configureStore({
  reducer: {
    User: userReducers,
  },
});
