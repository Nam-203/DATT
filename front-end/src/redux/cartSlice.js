import { createSlice } from '@reduxjs/toolkit';
import { cart } from '../util/cart';

const initialState = {
  cart: cart.getCart(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
      cart.setCart(action.payload);
    },

    addCart(state, action) {
      let item = {
        ...action.payload,
        quantity: 1,
      };
      const check = state.cart.some((value) => value._id === item._id);
      if (!check) {
        state.cart.push(item);
      }
      cart.setCart(state.cart);
    },

    deleteCart(state, action) {
      let item = {
        ...action.payload,
        quantity: 1,
      };
      state.cart = state.cart.filter((value) => value._id !== item._id);
      cart.setCart(state.cart);
    },

    subQuantity(state, action) {
      let item = {
        ...action.payload,
        quantity: 1,
      };
      // eslint-disable-next-line array-callback-return
      state.cart.filter((value) => {
        if (value._id === item._id) {
          if (value.quantity - 1 === 0) {
            state.cart = state.cart.filter((value) => value._id !== item._id);
          }
          return (value.quantity -= 1);
        }
      });
      cart.setCart(state.cart);
    },

    addQuantity(state, action) {
      let item = {
        ...action.payload,
        quantity: 1,
      };
      // eslint-disable-next-line array-callback-return
      state.cart.filter((value) => {
        if (value._id === item._id) {
          return (value.quantity += 1);
        }
      });
      cart.setCart(state.cart);
    },

    destroyCart: (state, action) => {
      state.cart = [];
      cart.destroyCart();
    },
  },
});

//action
export const cartAction = cartSlice.actions;

//select
export const selectCart = (state) => state.cart.cart;

const cartReducer = cartSlice.reducer;
export default cartReducer;
