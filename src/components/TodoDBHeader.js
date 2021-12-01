import { memo } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { darken, lighten } from 'polished';
import { MdRefresh, MdBackup } from 'react-icons/md';

import {
  useTodoState,
  useTodoDispatch,
  useModState,
  useModDispatch,
  useTodoNextId,
} from 'components/contexts/todoContext';

const Wrapper = styled.div`
  float: right;
  &:after {
    content: '';
    display: block;
    clear: both;
  }

  button {
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 5px;

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const StyledResetButton = styled.button`
  border: 1px solid #d2d2d2;
  background: #fff;

  &:active {
    background: ${darken(0.1, '#fff')};
  }
`;

const StyledSaveButton = styled.button`
  margin-left: 10px;
  background: ${(props) => (props.mod ? '#ff5a5a' : '#50e3a4')};
  color: #fff;

  &:hover {
    background: ${(props) =>
      props.mod ? lighten(0.1, '#ff5a5a') : lighten(0.1, '#50e3a4')};
  }
  &:active {
    background: ${(props) =>
      props.mod
        ? darken(0.1, '#ff5a5a')
        : props.mod
        ? darken(0.1, '#ff5a5a')
        : lighten(0.1, '#50e3a4')};
(0.1, '#50e3a4')};
  }
`;

const ResetButton = ({ onClick }) => {
  return (
    <StyledResetButton type="button" onClick={onClick}>
      <MdRefresh size={20} />
    </StyledResetButton>
  );
};

const SaveButton = ({ onClick }) => {
  const modState = useModState();
  return (
    <StyledSaveButton type="button" onClick={onClick} mod={modState}>
      <MdBackup size={20} />
    </StyledSaveButton>
  );
};

const DBHeader = () => {
  const state = useTodoState();
  const dispatch = useTodoDispatch();
  const modDispatch = useModDispatch();
  const nextId = useTodoNextId();

  const handleReset = async () => {
    try {
      nextId.current = 0;
      const res = await axios.get('/api/getTodos');
      const todos = await res.data.map((rowData) => ({
        id: nextId.current++,
        text: rowData.text,
        done: Boolean(rowData.done),
      }));
      dispatch({ type: 'RESET', todos });
      modDispatch({ type: 'SYNCED' });
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.post('/api/saveTodos', {
        todos: state,
      });
      const data = await res.data;
      if (data.success) {
        modDispatch({ type: 'SYNCED' });
      } else {
        console.log(data.msg);
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <Wrapper>
      <ResetButton onClick={handleReset}>Reset</ResetButton>
      <SaveButton onClick={handleSave}>Save</SaveButton>
    </Wrapper>
  );
};

export default DBHeader;
