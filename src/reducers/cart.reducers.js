import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "Cart",
  initialState: {
    cart: [],
  },
  reducers: {
    setCartItems: (state, action) => {
      const currentItem = action.payload;
      const cartItems = JSON.parse(localStorage.getItem("cart")) ?? [];
      if (cartItems.length === 0) {
        cartItems.push(currentItem);
      } else {
        let ind = null;
        cartItems.map((item, i) => {
          if (item.productId === currentItem.productId) {
            ind = i;
          }
        });
        if (ind === null) {
          cartItems.push(currentItem);
        } else if (currentItem.qty === 0) {
          cartItems.splice(ind, 1);
        } else {
          cartItems[ind]["qty"] = currentItem.qty;
        }
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));
      state.cart = cartItems;
    },
    updateCart: (state) => {
      state.cart = JSON.parse(localStorage.getItem("cart")) ?? null;
    },
  },
});

export const { setCartItems, updateCart } = CartSlice.actions;
export default CartSlice.reducer;
