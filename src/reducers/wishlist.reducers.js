import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userProdServiceObj from "../pages/home/product/product.services";

export const getUserWishlist = createAsyncThunk(
  "wishlist/getUserWishlist",
  async () => {
    try {
      let response = await userProdServiceObj.getWishlist();
      return response.data?.data;
    } catch (error) {
      throw "Something went wrong while fetching wishlist.";
    }
  }
);

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState: { wishlist: null },

  extraReducers: (builder) => {
    builder.addCase(getUserWishlist.fulfilled, (state, action) => {
      state.wishlist = action.payload;
    });
    builder.addCase(getUserWishlist.rejected, (state, action) => {
      state.wishlist = null;
    });
  },
});

export const {} = WishlistSlice.actions;
export default WishlistSlice.reducer;
