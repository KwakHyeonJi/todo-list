import React from 'react';
import styled from 'styled-components';

import { useTodoState } from 'contexts/todoProvider';
import TodoItem from 'components/TodoItem';

const TodoList = () => {
  const todos = useTodoState();
  return (
    <TodoListWrapper>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
        />
      ))}
    </TodoListWrapper>
  );
};

const TodoListWrapper = styled.ul`
  overflow-x: hidden;
  height: 460px;
  margin-top: 30px;
`;

export default TodoList;
