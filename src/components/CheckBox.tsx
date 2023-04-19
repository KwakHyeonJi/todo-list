import styled from 'styled-components'

const CheckBoxLayout = styled.label<{ checked: boolean }>`
    width: 25px;
    height: 25px;
    border: 2px solid ${({ theme }) => theme.secondary};
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
    transition: border 0.5s ease;

    &:before {
        content: '';
        position: absolute;
        top: 19px;
        left: 15px;
        transform: translate(-50%, -50%) rotate(-45deg);
        width: 22px;
        height: 14px;
        border-left: ${({ theme, checked }) => (checked ? `3px solid ${theme.success}` : 'none')};
        border-bottom: ${({ theme, checked }) => (checked ? `3px solid ${theme.success}` : 'none')};
    }

    input {
        display: none;
    }
`

interface CheckBoxProps {
    checked: boolean
    onChange: () => void
}

const CheckBox = ({ checked, onChange }: CheckBoxProps) => {
    return (
        <CheckBoxLayout checked={checked}>
            <input type='checkbox' checked={checked} onChange={onChange} />
        </CheckBoxLayout>
    )
}

export default CheckBox
