import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userProdServiceObj from "../pages/home/product/product.services";

export const getUserOrder = createAsyncThunk(
  "order/getUserOrder",
  async (orderId) => {
    try {
      let response = await userProdServiceObj.getUserOrder(orderId);
      //   console.log(response.data.data);
      return response.data?.data;
    } catch (error) {
      throw "Something went wrong while fetching order.";
    }
  }
);
// export const updateUserOrder = createAsyncThunk(
//   "order/updateUserOrder",
//   async (productId, data) => {
//     try {
//       let response = await userProdServiceObj.addToWishlist(productId);
//       return response.data?.data;
//     } catch (error) {
//       throw "Something went wrong while fetching order.";
//     }
//   }
// );

const OrderSlice = createSlice({
  name: "order",
  initialState: { order: null },

  extraReducers: (builder) => {
    builder.addCase(getUserOrder.pending, (state, action) => {
      state.order = null;
      state.loading = true;
    });
    builder.addCase(getUserOrder.fulfilled, (state, action) => {
      state.order = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserOrder.rejected, (state, action) => {
      state.order = null;
      state.loading = false;
    });
    // builder.addCase(updateUserOrder.pending, (state, action) => {
    //   state.order = null;
    //   state.loading = true;
    // });
    // builder.addCase(updateUserOrder.fulfilled, (state, action) => {
    //   state.order = action.payload;
    //   state.loading = false;
    // });
    // builder.addCase(updateUserOrder.rejected, (state, action) => {
    //   state.order = null;
    //   state.loading = false;
    // });
  },
});

export const {} = OrderSlice.actions;
export default OrderSlice.reducer;
