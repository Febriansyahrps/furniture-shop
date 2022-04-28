import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCartFlatbed,
} from "@fortawesome/free-solid-svg-icons";
import { cartActive } from "../slices/productSlice";

export const Nav = ({ cartItems }) => {
  const dispatch = useDispatch();

  return (
    <NavContainer>
      <Logo>
        <Link to={"/"}>
          <h2>Triconville</h2>
        </Link>
      </Logo>
      <CartButton onClick={() => dispatch(cartActive())}>
        <FontAwesomeIcon
          icon={
            cartItems && cartItems.length > 0 ? faCartFlatbed : faCartShopping
          }
        />
      </CartButton>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  width: 100%;
  height: 75px;
  background: #f5f5f5;
`;
const Logo = styled.div`
  a {
    color: #121212;
    text-decoration: none;
  }
`;
const CartButton = styled.button`
  background: transparent;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 2px solid #121212;
  cursor: pointer;
  svg {
    transition: all 0.25s ease;
    font-size: 20px;
    color: #121212;
  }
  &:hover {
    svg {
      font-size: 25px;
    }
  }
`;

export default Nav;
