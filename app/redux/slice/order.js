import { createSlice } from '@reduxjs/toolkit';
import { orderList } from '../../data';
const INITIAL_STATE = {
  progress_orders: [],
  this_month_orders: [],
};
const orderSlice = createSlice({
  name: 'order',
  initialState: INITIAL_STATE,
  reducers: {
    updateOrder(state, action) {
      state.progress_orders = orderList.filter(
        (item) => item.status === 'processing'
      );

      state.this_month_orders = orderList.filter(
        (item) => item.status !== 'processing'
      );
    },
  },
});

const { actions, reducer } = orderSlice;

export const { updateOrder } = actions;
export default reducer;
