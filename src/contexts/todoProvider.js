import React, {
  useReducer,
  createContext,
  useContext,
  useState,
  useRef,
} from 'react';

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'RESET':
      return action.todos;
    case 'CREATE':
      return [...state, { id: action.id, text: action.text, done: false }];
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

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();
const TodoSyncContext = createContext({});

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, []);
  const nextId = useRef(0);
  const [sync, setSync] = useState(true);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          <TodoSyncContext.Provider value={{ sync, setSync }}>
            {children}
          </TodoSyncContext.Provider>
        </TodoNextIdContext.Provider>
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

const useTodoNextId = () => {
  const context = useContext(TodoNextIdContext);
  if (!context) throw new Error('Cannot find TodoProvider');
  return context;
};

const useTodoSync = () => {
  const context = useContext(TodoSyncContext);
  if (!context) throw new Error('Cannot find TodoProvider');
  return context;
};

export {
  TodoProvider,
  useTodoState,
  useTodoDispatch,
  useTodoNextId,
  useTodoSync,
};
