import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart(state, action) {
      const product = action.payload;
      const newCart = [...state.carts];
      const indexCart = newCart.findIndex((item) => item.id === product.id);
      if (indexCart < 0) {
        newCart.push(product);
      } else {
        newCart[indexCart].qty += product.qty;
      }
      state.carts = newCart;
    },

    updateCart(state, action) {
      const product = action.payload;
      const newCart = [...state.carts];
      const indexCart = newCart.findIndex((item) => item.id === product.id);
      if (product.qty === 0) {
        newCart.splice(indexCart, 1);
      } else {
        newCart[indexCart] = product;
      }
      state.carts = newCart;
    },
  },
});

const { actions, reducer } = cartSlice;

export const { addCart, updateCart } = actions;
export default reducer;
