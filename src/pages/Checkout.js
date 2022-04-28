import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { API_KEY_CREATE_ORDER } from "../api";
import OrderItem from "../components/OrderItem";
import Form from "../components/Form";

const Checkout = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  // state shipping address
  const [shippingAddress, setShippingAddress] = useState({
    emailAddress: "",
    firstName: "",
    lastName: "",
  });
  const { emailAddress, firstName, lastName } = shippingAddress;
  // submit order handler
  const submitOrderHandler = (e) => {
    e.preventDefault();
    if (cartItems.length < 1) {
      Swal.fire(
        "Cart Empty",
        "Cart is empty, Please add product to checkout",
        "warning"
      );
    } else {
      Swal.fire({
        title: "Submit Order",
        text: "Are you sure want to submit order ?",
        icon: "question",
        confirmButtonColor: "#009907",
        confirmButtonText: "Submit order",
        cancelButtonColor: "#d33",
        showCancelButton: true,
      }).then(async (results) => {
        if (results.isConfirmed) {
          // post order data
          const submitOrder = await axios({
            method: "post",
            url: API_KEY_CREATE_ORDER,
            data: {
              email: emailAddress,
              firstname: firstName,
              lastname: lastName,
              orderlines: cartItems.map((state) => ({
                product_id: state.id,
                qty_order: state.quantity,
                subtotal: `${(state.quantity * state.price).toFixed(2)}`,
              })),
            },
          }).then((response) => response.data);
          if (submitOrder.status === "success") {
            navigate("/success");
            localStorage.setItem("carts", JSON.stringify([]));
            setCartItems(JSON.parse(localStorage.getItem("carts")));
          } else {
            Swal.fire("Sorry", "Something went wrong", "error");
          }
        }
      });
    }
  };

  return (
    <CheckoutContainer>
      <BackHeader>
        <p>
          <Link to="/"> Home </Link>
          &gt; Checkout
        </p>
      </BackHeader>
      <Content>
        <ShippingForm>
          <h2>Shipping Address</h2>
          <Form
            shippingAddress={shippingAddress}
            setShippingAddress={setShippingAddress}
            submitOrderHandler={submitOrderHandler}
          />
        </ShippingForm>
        <ProductOrder>
          <h2>Order Summary</h2>
          <OrderItems>
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((state) => (
                <OrderItem
                  key={state.id}
                  name={state.name}
                  subtotal={state.price * state.quantity}
                  productImage={state.productImage}
                  quantity={state.quantity}
                />
              ))
            ) : (
              <span>
                <p> Cart is Empty </p>
              </span>
            )}
          </OrderItems>
          <Subtotal>
            <p>Subtotal Order :</p>
            <p>
              {cartItems && cartItems.length > 0
                ? `IDR. ${cartItems
                    .reduce((accumulator, object) => {
                      return accumulator + object.price * object.quantity;
                    }, 0)
                    .toLocaleString()}.00
            `
                : "-"}
            </p>
          </Subtotal>
          <button
            type="submit"
            form="formAddress"
            onSubmit={submitOrderHandler}
          >
            <h2>SUBMIT ORDER</h2>
          </button>
        </ProductOrder>
      </Content>
    </CheckoutContainer>
  );
};

const CheckoutContainer = styled.div`
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
const Content = styled.div`
  display: flex;
  margin-top: 25px;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;
const ShippingForm = styled.div`
  margin-right: 20px;
  width: 50%;
  @media screen and (max-width: 800px) {
    width: 100%;
    margin: 0;
  }
`;
const ProductOrder = styled.div`
  width: 50%;
  button {
    width: 50%;
    height: 50px;
    margin-top: 20px;
    background-color: #121212;
    border: none;
    cursor: pointer;
    h2 {
      color: #fafafa;
    }
  }
  @media screen and (max-width: 800px) {
    margin-top: 25px;
    width: 100%;
    button {
      width: 250px;
    }
  }
`;
const OrderItems = styled.div`
  margin-top: 25px;
  width: 100%;
  min-height: 200px;
  border: solid 1px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  span {
    p {
      text-align: center;
      margin-top: 25px;
    }
  }
`;
const Subtotal = styled.div`
  margin-top: 20px;
  p {
    margin-bottom: 5px;
  }
`;
export default Checkout;
