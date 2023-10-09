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
export const updateUserWishlist = createAsyncThunk(
  "wishlist/updateUserWishlist",
  async (productId) => {
    try {
      let response = await userProdServiceObj.addToWishlist(productId);
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
    builder.addCase(getUserWishlist.pending, (state, action) => {
      state.wishlist = null;
      state.loading = true;
    });
    builder.addCase(getUserWishlist.fulfilled, (state, action) => {
      state.wishlist = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserWishlist.rejected, (state, action) => {
      state.wishlist = null;
      state.loading = false;
    });
    builder.addCase(updateUserWishlist.pending, (state, action) => {
      state.wishlist = null;
      state.loading = true;
    });
    builder.addCase(updateUserWishlist.fulfilled, (state, action) => {
      state.wishlist = action.payload;
      state.loading = false;
    });
    builder.addCase(updateUserWishlist.rejected, (state, action) => {
      state.wishlist = null;
      state.loading = false;
    });
  },
});

export const {} = WishlistSlice.actions;
export default WishlistSlice.reducer;
