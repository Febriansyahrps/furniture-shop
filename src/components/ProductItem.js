import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ProductItem = ({ productImg, productName, productPrice, id }) => {
  return (
    <ProductContainer>
      <Link to={`/product/${id}`}>
        <ProductImage>
          <img src={productImg} alt="product" />
        </ProductImage>
        <h3>{productName}</h3>
        <p>{`IDR. ${productPrice}`}</p>
      </Link>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: 25px 0;
  a {
    color: #121212;
    text-decoration: none;
  }
  h3 {
    margin: 15px 0 10px 0;
  }
  @media screen and (max-width: 500px) {
    width: 250px;
  }
`;
const ProductImage = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;
  height: 175px;
  align-items: center;
  img {
    object-fit: cover;
    width: 100%;
    transition: all 0.25s ease;
  }
  &:hover {
    img {
      width: 110%;
    }
  }
  @media screen and (max-width: 500px) {
    width: 250px;
    height: 150px;
  }
`;

export default ProductItem;
