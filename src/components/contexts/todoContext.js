import React, { useReducer, createContext, useContext, useRef } from 'react';

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'RESET':
      return action.todos;
    case 'CREATE':
      return [{ id: action.id, text: action.text, done: false }, ...state];
    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'DELETE':
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error('Unhandled action type');
  }
};

const modReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGED':
      return true;
    case 'SYNCED':
      return false;
    default:
      throw new Error('Unhandled action type');
  }
};

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const ModStateContext = createContext();
const ModDispatchContext = createContext();
const TodoNextIdContext = createContext();

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, []);
  const [modified, setModified] = useReducer(modReducer, false);
  const nextId = useRef(0);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <ModStateContext.Provider value={modified}>
          <ModDispatchContext.Provider value={setModified}>
            <TodoNextIdContext.Provider value={nextId}>
              {children}
            </TodoNextIdContext.Provider>
          </ModDispatchContext.Provider>
        </ModStateContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

const useTodoState = () => {
  const context = useContext(TodoStateContext);
  if (!context) throw new Error('Cannot find TodoProvider');
  return context;
};

const useTodoDispatch = () => {
  const context = useContext(TodoDispatchContext);
  if (!context) throw new Error('Cannot find TodoProvider');
  return context;
};

const useModState = () => {
  const context = useContext(ModStateContext);
  if (context === undefined) throw new Error('Cannot find TodoProvider');
  return context;
};

const useModDispatch = () => {
  const context = useContext(ModDispatchContext);
  if (!context) throw new Error('Cannot find TodoProvider');
  return context;
};

const useTodoNextId = () => {
  const context = useContext(TodoNextIdContext);
  if (!context) throw new Error('Cannot find TodoProvider');
  return context;
};

export {
  TodoProvider,
  useTodoState,
  useTodoDispatch,
  useModState,
  useModDispatch,
  useTodoNextId,
};
