import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  html{
    font-size: 62.5%;
  }

  body{
    font-family: "Lato", sans-serif;
  }

  #root{
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
`;

export default GlobalStyles;
