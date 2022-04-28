import { configureStore } from "@reduxjs/toolkit";
import productItemSlice from "./slices/productItemSlice";
import productSlice from "./slices/productSlice";

export default configureStore({
  reducer: {
    products: productSlice,
    productItem: productItemSlice,
  },
});
