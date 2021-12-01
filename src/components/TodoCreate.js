import { useState, memo, useCallback } from 'react';
import styled from 'styled-components';

import {
  useTodoState,
  useTodoDispatch,
  useModDispatch,
  useTodoNextId,
} from 'components/contexts/todoContext';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  padding: 0 40px;

  border-top: 1px solid #d2d2d2;
  background: #fff;
`;

const StyledCreateButton = styled.button`
  padding-right: 15px;
`;

const PlusIcon = styled.div`
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 40px;
    transform: translate(50%, -50%)
      ${(props) => (props.open ? 'rotate(45deg)' : '')};
    transition: 0.5s ease;
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
    width: 320px;
    padding: 8px 10px;
    border-radius: 5px;
    border: 1px solid #d2d2d2;
    font-size: 0.9rem;
  }
`;

const UndoneTasks = memo(() => {
  const state = useTodoState();
  const undoneTasks = state.filter((todo) => !todo.done).length;
  return <span>{undoneTasks} TASKS</span>;
});

const CreateButton = memo(({ onClick, open }) => {
  return (
    <StyledCreateButton type="button" onClick={onClick}>
      {open ? 'CANCEL' : 'ADD NEW'}
      <PlusIcon open={open} />
    </StyledCreateButton>
  );
});

const TodoCreate = () => {
  const dispatch = useTodoDispatch();
  const modDispatch = useModDispatch();
  const nextId = useTodoNextId();

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
    modDispatch({ type: 'CHANGED' });
  };

  return (
    <Wrapper>
      <UndoneTasks />
      <CreateButton open={open} onClick={handleOpen} />
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
    </Wrapper>
  );
};

export default TodoCreate;
