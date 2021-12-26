import { createGlobalStyle } from "styled-components";
import { generateMedia } from "styled-media-query";
import reset from "styled-reset";

export const customMedia = generateMedia({
	desktop: "1199px",
	tablet: "767px",
	lgMobile: "479px",
	mobile: "375px",
});

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
