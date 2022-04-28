import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Success = () => {
  return (
    <SuccessContainer>
      <h1>ORDER SUCCESS</h1>
      <p>Your order has been created</p>
      <Link to={"/"}>
        <h3>Back to Home</h3>
      </Link>
    </SuccessContainer>
  );
};

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 25px;
  a {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 50px;
    background: black;
    text-decoration: none;
    h3 {
      color: white;
    }
  }
`;

export default Success;
