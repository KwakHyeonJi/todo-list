import React from 'react';
import styled from 'styled-components';

const ThemeToggle = ({ toggle, mode }) => {
  return <ToggleWrapper onClick={toggle} mode={mode}></ToggleWrapper>;
};

const ToggleWrapper = styled.button``;

export default ThemeToggle;
