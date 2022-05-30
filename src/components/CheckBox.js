import React from 'react';
import styled from 'styled-components';

const CheckBox = ({ id, checked, onChange }) => {
  return (
    <CheckBoxWrapper>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id} />
    </CheckBoxWrapper>
  );
};

const CheckBoxWrapper = styled.div`
  input {
    display: none;

    &:checked + label:before {
      border-left: 3px solid ${({ theme }) => theme.successColor};
      border-bottom: 3px solid ${({ theme }) => theme.successColor};
    }
  }

  label {
    display: block;
    width: 25px;
    height: 25px;
    border: 2px solid ${({ theme }) => theme.secondaryColor};
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
    transition: border 0.5s ease;

    &:before {
      content: '';
      position: absolute;
      top: 22px;
      left: 16px;
      width: 20px;
      height: 10px;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`;

export default CheckBox;
