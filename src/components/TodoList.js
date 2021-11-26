import styled from 'styled-components';

import { useTodoState } from 'components/contexts/todoContext';
import TodoItem from 'components/TodoItem';

const Wrapper = styled.ul`
  overflow-x: hidden;
  height: 420px;
  margin-top: 50px;
`;

const TodoList = () => {
  const state = useTodoState();
  return (
    <Wrapper>
      {state.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
        />
      ))}
    </Wrapper>
  );
};

export default TodoList;
