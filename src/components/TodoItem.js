import { memo, useCallback } from 'react';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';

import {
  useTodoDispatch,
  useModDispatch,
} from 'components/contexts/todoContext';
import TodoCheckBox from 'components/TodoCheckBox';
import React from 'react';

const Wrapper = styled.li`
  position: relative;
  padding: 15px 0;
  font-size: 1.1rem;

  &:hover > button {
    display: block;
  }
`;

const StyledText = styled.span`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 80%;
  margin-left: 50px;
  line-height: 25px;
  color: ${(props) => (props.done ? '#d2d2d2' : 'inherit')};
`;

const StyledDeleteButton = styled.button`
  display: none;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  color: #d2d2d2;

  &:hover {
    color: #ff5a5a;
  }
`;

const DeleteButton = memo(({ onClick }) => {
  return (
    <StyledDeleteButton type="button" onClick={onClick}>
      <MdDelete size={20} />
    </StyledDeleteButton>
  );
});

const TodoItem = ({ id, text, done }) => {
  const dispatch = useTodoDispatch();
  const modDispatch = useModDispatch();

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE', id });
    modDispatch({ type: 'CHANGED' });
  };
  const handleDelete = useCallback(() => {
    dispatch({ type: 'DELETE', id });
    modDispatch({ type: 'CHANGED' });
  }, [dispatch, id, modDispatch]);

  return (
    <Wrapper>
      <TodoCheckBox id={id} checked={done} onChange={handleToggle} />
      <StyledText done={done}>{text}</StyledText>
      <DeleteButton onClick={handleDelete} />
    </Wrapper>
  );
};

export default memo(TodoItem);
