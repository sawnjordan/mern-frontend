import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthServiceObj from "../pages/home/auth/auth.service";
import { toast } from "react-toastify";

export const getLoggedInUser = createAsyncThunk(
  "user/getLoggedInUser",
  async () => {
    let token = localStorage.getItem("token");
    if (token) {
      let userDetails = await AuthServiceObj.getLoggedInUser();
      return userDetails.data?.data;
    } else {
      throw "Token not found.";
    }
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  let response = await AuthServiceObj.logoutUser();
  return response.data?.data;
});

const UserSlice = createSlice({
  name: "user",
  initialState: { loggedInUser: null },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoggedInUser.fulfilled, (state, action) => {
      state.loggedInUser = action.payload;
    });
    builder.addCase(getLoggedInUser.rejected, (state, action) => {
      state.loggedInUser = null;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.loggedInUser = null;
      localStorage.clear();
    });
  },
});

export const { setLoggedInUser } = UserSlice.actions;
export default UserSlice.reducer;
