import { createContext, useContext } from 'react';

const DBStateContext = createContext();

const DBProvider = ({ state, children }) => {
  return (
    <DBStateContext.Provider value={state}>{children}</DBStateContext.Provider>
  );
};

const useDBState = () => {
  const context = useContext(DBStateContext);
  if (context === undefined) throw new Error('Cannot find DBProvider');
  return context;
};

export { DBProvider, useDBState };
