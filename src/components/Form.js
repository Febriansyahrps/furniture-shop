import React from "react";
import styled from "styled-components";

const Form = ({ shippingAddress, setShippingAddress, submitOrderHandler }) => {
  // get shipping address input
  const getShippingAddress = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  return (
    <FormContainer id="formAddress" onSubmit={submitOrderHandler}>
      <h4>
        Email Address <span>*</span>
      </h4>
      <input
        type="email"
        pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
        name="emailAddress"
        value={shippingAddress.emailAddress}
        onChange={getShippingAddress}
        required
      />
      <p>You can create an account after checkout.</p>
      <NameInput>
        <div>
          <h4>
            First Name <span>*</span>
          </h4>
          <input
            type="text"
            name="firstName"
            value={shippingAddress.firstName}
            onChange={getShippingAddress}
            required
          />
        </div>
        <div>
          <h4>
            Last Name <span>*</span>
          </h4>
          <input
            type="text"
            name="lastName"
            value={shippingAddress.lastName}
            onChange={getShippingAddress}
            required
          />
        </div>
      </NameInput>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  margin-top: 25px;
  h4 {
    margin-top: 20px;
  }
  p {
    margin-top: 5px;
  }
  span {
    color: #d11a2a;
  }
  input {
    width: 50%;
    margin-top: 10px;
    font-family: "Poppins", sans-serif;
    border-radius: 2px;
    padding: 5px 10px;
    font-size: 16px;
    border: solid 1px rgba(0, 0, 0, 0.25);
  }
  @media screen and (max-width: 450px) {
    input {
      width: 95%;
    }
  }
`;
const NameInput = styled.div`
  display: flex;
  margin-top: 25px;
  div {
    width: 50%;
    input {
      width: 95%;
    }
  }
  @media screen and (max-width: 450px) {
    margin-top: 0;
    flex-direction: column;
    div {
      width: 100%;
    }
  }
`;

export default Form;
