import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  *, *::before, *::after {
    box-sizing: border-box;
    border: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    outline: 0 !important;
  }
  button, button:focus, input:focus, textarea:focus, select:focus {
    outline: 0 !important;
  }
  
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
      transition: "color 9999s ease-out,  background-color 9999s ease-out";
      transition-delay: 9999s; 
  }
  
  html {
    font-size: 62.5%;
    overflow-x: hidden;
  }
  b {
    font-weight: ${({ theme }) => theme.medium}
  }
  body {
    color: ${({ theme }) => theme.grey};
    background-color: ${({ theme }) => theme.dark};
    font-family: ${({ theme }) => theme.fonts.mainFont};
    font-size: 1.6rem;
    overflow-x: hidden;
  }
  h3 {
    font-family: ${({ theme }) => theme.fonts.mainFont};
    font-size: ${({ theme }) => theme.fontSize.xlg};
    font-weight: 900;
    color: white;
    padding: 15px 0 5px 0;
  }
  h4 {
    font-family: ${({ theme }) => theme.fonts.mainFont};
    font-size: ${({ theme }) => theme.fontSize.xlg};
    font-weight: 900;
    color: white;
    padding: 15px 0 5px 0;
  }
  strong {
    font-weight: 700;
  }
  a {
    text-decoration: none;
    color: #16ffff;
  }
  a:hover {
    color: #10caca;
  }
  svg#poland_icon {
  width: 20px;
  transition: all .1s ease;
  &:hover {
    opacity: .8;
    }
  }
  svg#gb_icon {
  width: 20px;
  transition: all .1s ease;
  &:hover {
    opacity: .8;
    }
  }
  article ol, article ul {
    padding-left: 30px;
    padding-bottom: 30px;
  }
  article ol {
    list-style: decimal;
  }
  article ul {
    list-style: auto;
  }
  .gatsby-highlight-code-line {
    display: block !important;
    background-color: rgba(160, 160, 160, 0.1);
    margin: 0 -0.75rem;
    padding: 0 0.75rem;
  }

`;

export default GlobalStyle;
