import React from "react";
import styled from "styled-components";

const OrderItem = ({ name, subtotal, quantity, productImage }) => {
  return (
    <OrderItemContainer>
      <ProductImage>
        <img src={productImage} alt="product" />
      </ProductImage>
      <Description>
        <div>
          <p>{name}</p>
          <p>Qty: {quantity}</p>
        </div>
        <div>
          <p>IDR. {subtotal.toLocaleString()}.00</p>
        </div>
      </Description>
    </OrderItemContainer>
  );
};
const OrderItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  width: 100%;
  height: 75px;
  padding: 0 20px;
  @media screen and (max-width: 450px) {
    height: 100%;
  }
`;
const ProductImage = styled.div`
  img {
    object-fit: cover;
    width: 50px;
    height: 50px;
  }
`;
const Description = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-left: 10px;
  p {
    margin-bottom: 5px;
  }
  @media screen and (max-width: 450px) {
    flex-direction: column;
  }
`;

export default OrderItem;
