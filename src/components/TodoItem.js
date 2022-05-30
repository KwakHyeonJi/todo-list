import React, { memo, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { MdDelete } from 'react-icons/md';

import { useTodoDispatch, useTodoSync } from 'contexts/todoProvider';
import CheckBox from 'components/CheckBox';

const TodoItem = ({ id, text, done }) => {
  const dispatch = useTodoDispatch();
  const { setSync } = useTodoSync();

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE', id });
    setSync(false);
  };

  const handleDelete = useCallback(() => {
    dispatch({ type: 'DELETE', id });
    setSync(false);
  }, [dispatch, id, setSync]);

  return (
    <TodoItemWrapper>
      <CheckBox id={id} checked={done} onChange={handleToggle} />
      <Text done={done}>{text}</Text>
      <DeleteButton type="button" onClick={handleDelete}>
        <MdDelete size={20} />
      </DeleteButton>
    </TodoItemWrapper>
  );
};

const TodoItemWrapper = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  width: 95%;
  padding: 1rem 0;

  &:hover button {
    display: flex;
    align-items: center;
  }
`;

const Text = styled.span`
  ${({ theme, done }) => {
    const textColor = theme.textColor;
    const doneColor = theme.secondaryColor;
    return css`
      overflow: hidden;
      text-overflow: ellipsis;
      width: 90%;
      padding: 0 1rem;
      color: ${done ? doneColor : textColor};
      font-size: 1.1rem;
      line-height: normal;
      white-space: nowrap;
      transition: color 0.5s ease;
    `;
  }}
`;

const DeleteButton = styled.button`
  display: none;
  color: ${({ theme }) => theme.secondaryColor};

  &:hover {
    color: ${({ theme }) => theme.dangerColor};
  }
`;

export default memo(TodoItem);
