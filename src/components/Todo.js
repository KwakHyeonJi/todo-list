import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { useTodoDispatch, useTodoNextId } from 'contexts/todoProvider';
import DbHeader from 'components/DbHeader';
import TodoHeader from 'components/TodoHeader';
import TodoList from 'components/TodoList';
import TodoCreate from 'components/TodoCreate';

const Todo = () => {
  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axios.get('/api/getTodos');
        nextId.current = 0;
        dispatch({
          type: 'RESET',
          todos: await response.data.map((rowData) => ({
            id: nextId.current++,
            text: rowData.text,
            done: Boolean(rowData.done),
          })),
        });
      } catch (e) {
        console.error(e.message);
      }
    };
    getTodos();
  }, [dispatch, nextId]);

  return (
    <TodoWrapper>
      <DbHeader />
      <TodoHeader />
      <TodoList />
      <TodoCreate />
    </TodoWrapper>
  );
};

const TodoWrapper = styled.div`
  position: relative;
  width: 500px;
  height: 750px;
  padding: 30px 40px;
  background: ${({ theme }) => theme.primaryColor};
  box-shadow: 2px 2px 12px rgb(0, 0, 0, 0.2);
`;

export default Todo;
