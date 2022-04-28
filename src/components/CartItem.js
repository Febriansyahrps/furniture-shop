import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { API_KEY_VALIDATION_ITEM } from "../api";

const CartItem = ({
  id,
  name,
  subtotal,
  quantity,
  productImage,
  setCartItems,
}) => {
  // new quantity state
  const [newQuantity, setNewQuantity] = useState(quantity);

  useEffect(() => {
    // set recent quantity
    setNewQuantity(quantity);
  }, [quantity]);

  // get new quantity input value
  const getNewQuantity = (e) => {
    setNewQuantity(e.target.value);
  };

  // change quantity of cart
  const changeQuantityHandler = async (id, quantity) => {
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
      let carts = JSON.parse(localStorage.getItem("carts"));
      let cartItem = carts.find((item) => item.id === id);
      cartItem.quantity = quantity;
      localStorage.setItem("carts", JSON.stringify(carts));
      setCartItems(JSON.parse(localStorage.getItem("carts")));
      Swal.fire("Update Success", `${validation.message}`, "success");
    } else {
      Swal.fire("Sorry", `${validation.message}`, "error");
    }
  };

  // delete cart item
  const deleteItemHandler = (id) => {
    Swal.fire({
      title: "Delete Item",
      text: "Are you sure want delete this item ?",
      icon: "warning",
      confirmButtonColor: "#d11a2a",
      confirmButtonText: "Delete Item",
      cancelButtonColor: "#696969",
      showCancelButton: true,
    }).then((results) => {
      if (results.isConfirmed) {
        let carts = JSON.parse(localStorage.getItem("carts"));
        const indexItem = carts.findIndex((state) => state.id === id);
        if (indexItem > -1) {
          carts.splice(indexItem, 1);
        }
        localStorage.setItem("carts", JSON.stringify(carts));
        setCartItems(JSON.parse(localStorage.getItem("carts")));
      }
    });
  };

  return (
    <CartItemContainer>
      <ProductImage>
        <img src={productImage} alt="product" />
      </ProductImage>
      <Description>
        <p>{name}</p>
        <p>{`IDR. ${subtotal.toLocaleString()}.00`}</p>
        <Quantity>
          <p>Qty:</p>
          <input type="text" value={newQuantity} onChange={getNewQuantity} />
          <button onClick={() => changeQuantityHandler(id, newQuantity)}>
            <h4>UPDATE</h4>
          </button>
        </Quantity>
      </Description>
      <DeleteButton onClick={() => deleteItemHandler(id)}>
        <FontAwesomeIcon icon={faX} />
      </DeleteButton>
    </CartItemContainer>
  );
};

const CartItemContainer = styled.div`
  display: flex;
  height: 100px;
  margin: 20px 20px;
`;
const ProductImage = styled.div`
  img {
    object-fit: cover;
    width: 50px;
    height: 50px;
  }
`;
const Description = styled.div`
  margin-left: 10px;
  p {
    margin-bottom: 5px;
  }
`;
const Quantity = styled.div`
  display: flex;
  margin-top: 10px;
  input {
    margin-left: 5px;
    font-family: "Poppins", sans-serif;
    text-align: center;
    font-size: 16px;
    width: 50px;
    height: 30px;
    border: 1px solid rgba(0, 0, 0, 0.25);
  }
  button {
    margin-left: 10px;
    width: 100px;
    height: 30px;
    border: none;
    background: #6d4c4c;
    cursor: pointer;
    h4 {
      color: #fafafa;
    }
  }
`;
const DeleteButton = styled.button`
  cursor: pointer;
  margin: 0 0 0 auto;
  width: 50px;
  height: 50px;
  border: none;
  background: none;
  svg {
    color: rgba(0, 0, 0, 0.5);
  }
`;

export default CartItem;
