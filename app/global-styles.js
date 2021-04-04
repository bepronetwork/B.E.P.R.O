import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }


  #app {
    background-color: white;
    min-height: 100%;
    min-width: 100%;
  }

  a{
    color : #000000; 
    text-decoration: none;
  }

  p,
  label, h3, h2, h1 {
    font-family: 'Sanchez', serif;    
    font-style: normal;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0em;

    color: #000000;
    font-weight: normal;
  }
`;

export default GlobalStyle;
