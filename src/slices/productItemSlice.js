import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY_PRODUCT_ITEM } from "../api";

const productItemSlice = createSlice({
  name: "PRODUCT_ITEM",
  initialState: {
    product: {},
  },
  reducers: {
    product: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const getProductItem = (id) => async (dispatch) => {
  const getData = await axios
    .get(API_KEY_PRODUCT_ITEM(id))
    .then((response) => response.data)
    .catch((err) => console.log(err));
  dispatch(product(getData));
};

export const { product } = productItemSlice.actions;
export default productItemSlice.reducer;
