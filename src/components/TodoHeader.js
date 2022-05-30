import React from 'react';
import styled from 'styled-components';

const TodoHeader = () => {
  const today = new Date();
  const year = today.toLocaleDateString('en-US', { year: 'numeric' });
  const day = today.toLocaleDateString('en-US', { day: '2-digit' });
  const month = today
    .toLocaleDateString('en-US', { month: 'short' })
    .toUpperCase();
  const weekday = today
    .toLocaleDateString('en-US', { weekday: 'long' })
    .toUpperCase();
  return (
    <TodoHeaderWrapper>
      <span>{day}</span>
      <span>
        <p>{month}</p>
        <p>{year}</p>
      </span>
      <span>{weekday}</span>
    </TodoHeaderWrapper>
  );
};

const TodoHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;

  span:nth-child(1) {
    font-size: 2.8rem;
  }

  span:nth-child(2) {
    padding: 0 1rem;
    line-height: 1.4;

    p:last-child {
      color: ${({ theme }) => theme.secondaryColor};
      font-weight: 500;
    }
  }

  span:nth-child(3) {
    margin-left: auto;
    font-size: 1.2rem;
  }
`;

export default TodoHeader;
