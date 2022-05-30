import React, { useState, memo, useCallback } from 'react';
import styled from 'styled-components';

import {
  useTodoState,
  useTodoDispatch,
  useTodoNextId,
  useTodoSync,
} from 'contexts/todoProvider';

const UndoneTasks = memo(() => {
  const todos = useTodoState();
  const undoneTasks = todos.filter((todo) => !todo.done).length;
  return <span>{undoneTasks} TASKS</span>;
});

const TodoCreate = () => {
  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();
  const { setSync } = useTodoSync();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  const handleOpen = useCallback(() => setOpen(!open), [open]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE',
      id: nextId.current++,
      text: input,
    });
    setInput('');
    setOpen(false);
    setSync(false);
  };

  return (
    <TodoCreateWrapper>
      <UndoneTasks />
      <CreateButton type="button" onClick={handleOpen} open={open}>
        {open ? 'CANCEL' : 'ADD NEW'}
      </CreateButton>
      {open && (
        <CreateForm onSubmit={handleSubmit}>
          <input
            placeholder={'할 일을 입력 후 Enter를 누르세요'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            required
            maxLength="100"
          />
        </CreateForm>
      )}
    </TodoCreateWrapper>
  );
};

const TodoCreateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  padding: 0 40px;
  border-top: 1px solid ${({ theme }) => theme.secondaryColor};
  background: ${({ theme }) => theme.primaryColor};
  transition: background 0.5s ease, border-top 0.5s ease;
`;

const CreateButton = styled.button`
  padding-right: 30px;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 50px;
    transform: translate(50%, -50%)
      ${({ open }) => (open ? 'rotate(45deg)' : '')};
    transition: transform 0.2s ease;
  }

  &:before {
    width: 12px;
    border-top: 2px solid;
  }
  &:after {
    height: 12px;
    border-left: 2px solid;
  }
`;

const CreateForm = styled.form`
  position: absolute;

  input {
    width: 310px;
    padding: 0.5rem 0.7rem;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.secondaryColor};
    background: ${({ theme }) => theme.primaryColor};
    font-size: 0.9rem;
    transition: all 0.5s ease;
  }
`;

export default TodoCreate;
