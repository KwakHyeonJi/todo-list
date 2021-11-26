import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  font-weight: 600;
`;

const Day = styled.span`
  margin-right: 12px;
  font-size: 2.8rem;
`;

const Weekday = styled.span`
  margin-left: auto;
  font-size: 1.2rem;
`;

const Month = styled.div`
  line-height: 1.4rem;
`;

const Year = styled.div`
  color: #a4a4a4;
  line-height: 1.4rem;
`;

const TodoHeader = () => {
  const today = new Date();
  const year = today.toLocaleDateString('en-US', { year: 'numeric' });
  const day = today.toLocaleDateString('en-US', { day: '2-digit' });
  const month = today
    .toLocaleDateString('en-US', { month: 'short' })
    .toUpperCase();
  const weekday = today
    .toLocaleDateString('en-US', { weekday: 'long' })
    .toUpperCase();
  return (
    <Wrapper>
      <Day>{day}</Day>
      <div>
        <Month>{month}</Month>
        <Year>{year}</Year>
      </div>
      <Weekday>{weekday}</Weekday>
    </Wrapper>
  );
};

export default TodoHeader;
