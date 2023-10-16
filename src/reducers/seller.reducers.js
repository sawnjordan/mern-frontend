import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import sellerServiceObj from "../pages/seller/seller.services";

export const getSellerProducts = createAsyncThunk(
  "seller/getSellerProducts",
  async () => {
    try {
      let response = await sellerServiceObj.getSellerProducts();
      return response.data?.data;
    } catch (error) {
      throw "Something went wrong while fetching order.";
    }
  }
);

const SellerSlice = createSlice({
  name: "seller",
  initialState: { productDetails: null },

  extraReducers: (builder) => {
    builder.addCase(getSellerProducts.pending, (state, action) => {
      state.productDetails = null;
      state.loading = true;
    });
    builder.addCase(getSellerProducts.fulfilled, (state, action) => {
      state.productDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(getSellerProducts.rejected, (state, action) => {
      state.productDetails = null;
      state.loading = false;
    });
  },
});

export const {} = SellerSlice.actions;
export default SellerSlice.reducer;
