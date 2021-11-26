import { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { useDBState } from 'components/contexts/dbContext';
import {
  useTodoDispatch,
  useTodoNextId,
} from 'components/contexts/todoContext';
import DBHeader from 'components/TodoDBHeader';
import TodoHeader from 'components/TodoHeader';
import TodoList from 'components/TodoList';
import TodoCreate from 'components/TodoCreate';
import TodoBlock from 'components/TodoBlock';

const Wrapper = styled.div`
  position: relative;
  background: #fff;
  width: 500px;
  height: 750px;
  padding: 30px 40px;
  box-shadow: 0 0 8px rgb(0, 0, 0, 0.2);
`;

const Todo = () => {
  const DBState = useDBState();
  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  useEffect(() => {
    const initTodo = async () => {
      try {
        const res = await axios.get('/api/getTodos');
        const _todos = await res.data.map((rowData) => ({
          id: nextId.current++,
          text: rowData.text,
          done: Boolean(rowData.done),
        }));
        dispatch({ type: 'RESET', todos: _todos });
      } catch (e) {
        console.error(e.message);
      }
    };
    DBState && initTodo();
  }, [DBState, dispatch, nextId]);

  return (
    <Wrapper>
      {!DBState && <TodoBlock />}
      <DBHeader />
      <TodoHeader />
      <TodoList />
      <TodoCreate />
    </Wrapper>
  );
};

export default Todo;
