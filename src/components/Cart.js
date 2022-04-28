import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { cartActive } from "../slices/productSlice";
import Swal from "sweetalert2";
// import cartItem component
import CartItem from "./CartItem";

const Cart = ({ cartItems, setCartItems }) => {
  const dispatch = useDispatch();
  // check cart bar active
  const { isCartActive } = useSelector((state) => state.products);
  // checkout empty handler
  const checkoutHandler = () => {
    if (cartItems && cartItems.length > 0) {
      dispatch(cartActive());
    } else {
      Swal.fire(
        "Cart Empty",
        "Cart is empty, Please add product to checkout",
        "warning"
      );
    }
  };

  return (
    <div>
      <BlankElement
        isActive={isCartActive}
        onClick={() => dispatch(cartActive())}
      />
      <Content isActive={isCartActive}>
        <CartHeader>
          <BackButton>
            <FontAwesomeIcon
              icon={faChevronRight}
              onClick={() => dispatch(cartActive())}
            />
          </BackButton>
          <h2>My Cart</h2>
        </CartHeader>
        <CartItems>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((state) => (
              <CartItem
                key={state.id}
                id={state.id}
                name={state.name}
                subtotal={state.price * state.quantity}
                productImage={state.productImage}
                quantity={state.quantity}
                setCartItems={setCartItems}
              />
            ))
          ) : (
            <span>
              <p> Cart is Empty </p>
            </span>
          )}
        </CartItems>
        <CheckoutSection>
          <p>Cart Subtotal :</p>
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
          <Link
            to={
              cartItems && cartItems.length > 0
                ? "/checkout"
                : { javascript: void 0 }
            }
            onClick={() => checkoutHandler()}
          >
            <h3>PROCEED TO CHECKOUT</h3>
          </Link>
        </CheckoutSection>
      </Content>
    </div>
  );
};

const BlankElement = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  transform: translateX(100%);
  /* Cart Activated */
  ${(props) => !props.isActive} {
    transform: translateX(0%);
  }
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const Content = styled.div`
  position: fixed;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  top: 0;
  right: 0;
  width: 500px;
  height: 100%;
  background: #fafafa;
  transition: all 0.75s ease;
  transform: translateX(100%);
  /* Cart Activated */
  ${(props) => !props.isActive} {
    transform: translateX(0%);
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;
const CartHeader = styled.div`
  display: flex;
  align-items: center;
  min-height: 75px;
  border-bottom: 3px solid rgba(0, 0, 0, 0.25);
  h2 {
    margin: 0 auto;
  }
`;
const BackButton = styled.button`
  position: absolute;
  margin-left: 10px;
  border: none;
  background: none;
  cursor: pointer;
  svg {
    font-size: 24px;
    color: rgba(0, 0, 0, 0.5);
  }
`;
const CartItems = styled.div`
  span {
    p {
      text-align: center;
      margin-top: 25px;
    }
  }
`;
const CheckoutSection = styled.div`
  margin: auto 5% 0 5%;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    width: 100%;
    height: 50px;
    text-decoration: none;
    background: #121212;
    h3 {
      color: #fafafa;
    }
  }
`;
export default Cart;
