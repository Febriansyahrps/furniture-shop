import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProducts } from "./slices/productSlice";
import GlobalStyle from "./components/GlobalStyle";
import Nav from "./components/Nav";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // get products from redux
    dispatch(getProducts());
    // create local Storrage
    if (localStorage.getItem("carts") === null) {
      localStorage.setItem("carts", JSON.stringify([]));
    }
  }, [dispatch]);
  // get data from local storage
  const carts = JSON.parse(localStorage.getItem("carts"));
  const [cartItems, setCartItems] = useState(carts);

  return (
    <div className="App">
      <GlobalStyle />
      <Nav cartItems={cartItems} />
      <Cart cartItems={cartItems} setCartItems={setCartItems} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/product/:id"
          element={
            <ProductDetail cartItems={cartItems} setCartItems={setCartItems} />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout cartItems={cartItems} setCartItems={setCartItems} />
          }
        />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
