import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ProductItem from "../components/ProductItem";

const Home = () => {
  const { products } = useSelector((state) => state.products);
  return (
    <HomeContainer>
      <h1>Products</h1>
      <Products>
        {products &&
          products.map((state) => (
            <ProductItem
              key={state.id}
              id={state.id}
              productImg={state.img_product}
              productName={state.name}
              productPrice={state.price}
            />
          ))}
      </Products>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  margin-top: 50px;
  text-align: center;
`;
const Products = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export default Home;
