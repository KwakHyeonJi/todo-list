import React from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { darken, lighten } from 'polished';
import { MdRefresh, MdBackup } from 'react-icons/md';

import {
  useTodoState,
  useTodoDispatch,
  useTodoNextId,
  useTodoSync,
} from 'contexts/todoProvider';
import ThemeToggle from 'components/ThemeToggle';

const DbHeader = () => {
  const todos = useTodoState();
  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();
  const { sync, setSync } = useTodoSync();

  const handleReset = async () => {
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
      setSync(true);
    } catch (e) {
      console.error(e.message);
      setSync(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('/api/saveTodos', {
        todos,
      });
      const data = await response.data;
      if (data.success) {
        setSync(true);
      } else {
        console.log(data.msg);
        setSync(false);
      }
    } catch (e) {
      console.error(e.message);
      setSync(false);
    }
  };

  return (
    <DbHeaderWrapper>
      <ThemeToggle />
      <ResetButton type="button" onClick={handleReset} sync={sync}>
        <MdRefresh size={20} />
      </ResetButton>
      <SaveButton type="button" onClick={handleSave} sync={sync}>
        <MdBackup size={20} />
      </SaveButton>
    </DbHeaderWrapper>
  );
};

const DbHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  align-items: center;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }

  button:first-child {
    margin-right: 1rem;
  }

  button + button {
    margin-left: 0.5rem;
  }
`;

const ResetButton = styled.button`
  ${({ theme, sync }) => {
    return css`
      border: 1px solid ${theme.secondaryColor};
      border-radius: 5px;
      background: ${theme.primaryColor};
      pointer-events: ${sync ? 'none' : 'auto'};
      transition: all 0.5s ease;

      &:active {
        background: ${darken(0.1, theme.primaryColor)};
      }
    `;
  }}
`;

const SaveButton = styled.button`
  ${({ theme, sync }) => {
    const success = theme.successColor;
    const danger = theme.dangerColor;

    return css`
      border: 1px solid ${sync ? success : danger};
      border-radius: 5px;
      background: ${sync ? success : danger};
      color: #fff;
      pointer-events: ${sync ? 'none' : 'auto'};
      transition: all 0.5s ease;

      &:hover {
        border: 1px solid ${sync ? lighten(0.1, success) : lighten(0.1, danger)};
        background: ${sync ? lighten(0.1, success) : lighten(0.1, danger)};
      }

      &:active {
        border: 1px solid ${sync ? darken(0.1, success) : darken(0.1, danger)};
        background: ${sync ? darken(0.1, success) : darken(0.1, danger)};
      }
    `;
  }}
`;

export default DbHeader;
