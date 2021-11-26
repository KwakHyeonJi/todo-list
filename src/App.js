import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import GlobalStyle from 'styles/GlobalStyle';
import { DBProvider } from 'components/contexts/dbContext';
import { TodoProvider } from 'components/contexts/todoContext';
import Todo from 'components/Todo';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #f0efe9;
`;

const dbTest = (onConnect) => {
  axios
    .get('/api/test')
    .then((res) => res.data[0].result === 'OK' && onConnect())
    .catch((e) => console.error(e.message));
};

const App = () => {
  const [DBconnect, setDBconnect] = useState(false);
  const onConnect = () => setDBconnect(true);

  useEffect(() => dbTest(onConnect), []);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <DBProvider state={DBconnect}>
          <TodoProvider>
            <Todo />
          </TodoProvider>
        </DBProvider>
      </Wrapper>
    </>
  );
};

export default App;
