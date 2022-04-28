import { createGlobalStyle } from "styled-components";
const styled = { createGlobalStyle };
const GlobalStyle = styled.createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: "Poppins", sans-serif;
  }
  h1,
  h2,
  h3,
  h4,
  p {
    color: #121212;
  }
`;

export default GlobalStyle;
