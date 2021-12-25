import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { generateMedia } from 'styled-media-query';

export const customMedia = generateMedia({
  mobile: '375px',
  lgMobile: '480px',
  tablet: '768px',
  desktop: '1200px',
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
