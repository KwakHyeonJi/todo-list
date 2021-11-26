import styled from 'styled-components';
import { RiEmotionSadLine } from 'react-icons/ri';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);

  p {
    text-align: center;
    margin-top: 10px;
    line-height: 2rem;
    font-size: 1.2rem;
    font-weight: bold;
  }

  z-index: 999;
`;

const TodoBlock = () => {
  return (
    <Wrapper>
      <RiEmotionSadLine size={80} />
      <p>
        CANNOT CONNECT <br />
        TO DATABASE SERVER
      </p>
    </Wrapper>
  );
};

export default TodoBlock;
