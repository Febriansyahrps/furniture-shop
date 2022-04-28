import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { getProductItem } from "../slices/productItemSlice";
import { API_KEY_VALIDATION_ITEM } from "../api";

const ProductDetail = ({ cartItems, setCartItems }) => {
  const dispatch = useDispatch();
  // quantity state
  const [newQuantity, setNewQuantity] = useState(1);
  // get id of product
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];

  useEffect(() => {
    // get detail of product
    dispatch(getProductItem(pathId));
    // get recent quantity
    if (cartItems) {
      const indexItem = cartItems.findIndex((state) => state.id === pathId);
      if (indexItem > -1) {
        setNewQuantity(cartItems[indexItem].quantity);
      }
    }
  }, [dispatch, pathId, cartItems]);

  // use selector of product
  const { product } = useSelector((state) => state.productItem);
  const { img_product, name, price, id } = product;

  // validate quantity of product
  const validateQuantityHandler = async (
    id,
    quantity,
    name,
    productImage,
    price
  ) => {
    const validation = await axios({
      method: "post",
      url: API_KEY_VALIDATION_ITEM,
      data: {
        product_id: id,
        quantity: quantity,
      },
    }).then((response) => response.data);
    // store data to local storage
    if (validation.status === 1) {
      let carts = JSON.parse(localStorage.getItem("carts")) || [];
      let cartItem = carts.find((item) => item.id === id);
      if (cartItem) {
        cartItem.quantity = quantity;
      } else {
        carts.push({
          id: id,
          name: name,
          productImage: productImage,
          price: price,
          quantity: quantity,
        });
      }
      localStorage.setItem("carts", JSON.stringify(carts));
      setCartItems(JSON.parse(localStorage.getItem("carts")));
      Swal.fire("Add to cart", `${validation.message}`, "success");
    } else {
      Swal.fire("Sorry", `${validation.message}`, "error");
    }
  };

  return (
    <ProductContainer>
      {id === pathId && (
        <>
          <BackHeader>
            <p>
              <Link to="/"> Home </Link>
              &gt; {name}
            </p>
          </BackHeader>
          <Product>
            <ProductImage>
              <img src={img_product} alt="product" />
            </ProductImage>
            <Description>
              <h1>{name}</h1>
              <h3>{`IDR. ${price}`}</h3>
              <AddToChartElement>
                <QuantityButton>
                  <button
                    disabled={newQuantity === 1}
                    onClick={() => setNewQuantity(newQuantity - 1)}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <p>{newQuantity}</p>
                  <button onClick={() => setNewQuantity(newQuantity + 1)}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </QuantityButton>
                <AddToChartButton
                  onClick={() =>
                    validateQuantityHandler(
                      id,
                      newQuantity,
                      name,
                      img_product,
                      price
                    )
                  }
                >
                  <h2>Add To Cart</h2>
                </AddToChartButton>
              </AddToChartElement>
            </Description>
          </Product>
        </>
      )}
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  margin: 25px 5%;
`;
const BackHeader = styled.div`
  a {
    text-decoration: none;
    color: #121212;
    &:hover {
      font-weight: bold;
    }
  }
`;
const Product = styled.div`
  display: flex;
  margin-top: 25px;
  img {
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;
const ProductImage = styled.div`
  width: 50%;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;
const Description = styled.div`
  margin-left: 25px;
  width: 45%;
  @media screen and (max-width: 800px) {
    width: 100%;
    margin: 0;
  }
`;
const AddToChartElement = styled.div`
  margin-top: 25px;
  display: flex;
`;
const QuantityButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 150px;
  height: 50px;
  border: 2px solid #121212;
  button {
    height: 50px;
    width: 50px;
    border: none;
    background: none;
    cursor: pointer;
  }
  p {
    text-align: center;
    width: 50px;
  }
  @media screen and (max-width: 800px) {
    max-width: 100px;
  }
`;
const AddToChartButton = styled.button`
  cursor: pointer;
  margin-left: 20px;
  width: 300px;
  height: 50px;
  background: #121212;
  border: none;
  h2 {
    color: #fafafa;
  }
  @media screen and (max-width: 800px) {
    max-width: 200px;
  }
`;

export default ProductDetail;
