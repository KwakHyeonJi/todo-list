import React from 'react';
import styled from 'styled-components';

import { useTheme } from 'contexts/themeProvider';

const ThemeToggle = () => {
  const [themeMode, toggleTheme] = useTheme();
  return <ThemeToggleWrapper onClick={toggleTheme} mode={themeMode} />;
};

const ThemeToggleWrapper = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.textColor};
  transition: all 0.5s ease;

  &:before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border: 1px solid ${({ theme }) => theme.secondaryColor};
    border-radius: 50%;
  }
`;

export default ThemeToggle;
