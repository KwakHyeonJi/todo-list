import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    color: #5c5e60;
  }

  button {
    font-family: 'Poppins', sans-serif;
    border: none;
    outline: none;
    padding: 0;
    background: transparent;
    color: #5c5e60;
    font-size: 1rem;
    cursor: pointer;
  }

  input {
    outline: none;
    color: #5c5e60;
    font-size: 1rem;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #d2d2d2;
  }
`;

export default GlobalStyle;
