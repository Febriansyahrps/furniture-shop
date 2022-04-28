import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY_PRODUCTS } from "../api";

const productSlice = createSlice({
  name: "PRODUCTS",
  initialState: {
    isCartActive: false,
    products: [],
  },
  reducers: {
    cartActive: (state) => {
      state.isCartActive = !state.isCartActive;
    },
    products: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const getProducts = () => async (dispatch) => {
  const getData = await axios
    .get(API_KEY_PRODUCTS)
    .then((response) => response.data)
    .catch((err) => console.log(err));
  dispatch(products(getData));
};

export const { cartActive, products } = productSlice.actions;
export default productSlice.reducer;
