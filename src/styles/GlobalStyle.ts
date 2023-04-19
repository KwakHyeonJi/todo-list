import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Poppins', sans-serif;
    transition: color 0.5s ease;
  }

  button {
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.text};
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    outline: none;
    cursor: pointer;
  }

  input {
    color: ${({ theme }) => theme.text};
    font-size: 1rem;
    outline: none;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: ${({ theme }) => theme.secondary};
  }
`

export default GlobalStyle
