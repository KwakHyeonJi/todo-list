import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.textColor};
    font-family: 'Poppins', sans-serif;
    transition: background 0.5s ease, color 0.5s ease;
  }

  button {
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.textColor};
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    outline: none;
    cursor: pointer;
  }

  input {
    color: ${({ theme }) => theme.textColor};
    font-size: 1rem;
    outline: none;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: ${({ theme }) => theme.secondaryColor};
  }
`;

export default GlobalStyle;
