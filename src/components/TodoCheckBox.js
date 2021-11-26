import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledInput = styled.input`
  display: none;
  &:checked + label:before {
    border-left: 3px solid #50e3a4;
    border-bottom: 3px solid #50e3a4;
  }
`;

const StyledCheckbox = styled.label`
  display: block;
  border: 2px solid #d2d2d2;
  border-radius: 8px;
  background: transparent;
  width: 25px;
  height: 25px;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    top: 20%;
    left: 70%;
    width: 20px;
    height: 10px;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const TodoCheckBox = ({ id, checked, onChange }) => {
  return (
    <Wrapper>
      <StyledInput
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <StyledCheckbox htmlFor={id} />
    </Wrapper>
  );
};

export default TodoCheckBox;
