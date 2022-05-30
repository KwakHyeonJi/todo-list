import React from 'react';

import { ThemeProvider } from 'contexts/themeProvider';
import GlobalStyle from 'theme/GlobalStyle';
import { TodoProvider } from 'contexts/todoProvider';
import Todo from 'components/Todo';

const App = () => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <TodoProvider>
        <Todo />
      </TodoProvider>
    </ThemeProvider>
  );
};

export default App;
