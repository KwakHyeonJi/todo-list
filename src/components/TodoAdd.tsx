import { useState } from 'react'
import styled from 'styled-components'

import { useTodoState, useTodoDispatch } from '../contexts/todoContext'
import { TodoActionTypes } from '../contexts/todoReducer'
import { createTodo } from '../api/todo'
import useInput from '../hooks/useInput'

const TodoAddLayout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 120px;
    padding: 0 40px;
    border-top: 1px solid ${({ theme }) => theme.secondary};
    border-radius: 0 0 20px 20px;
    font-size: 1.2rem;
`

const TodoAddButton = styled.button<{ open: boolean }>`
    padding-right: 40px;
    font-size: 1.2rem;

    &:before,
    &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: 50px;
        transform: translate(50%, -50%) ${({ open }) => (open ? 'rotate(45deg)' : '')};
        transition: transform 0.2s ease;
    }

    &:before {
        width: 16px;
        border-top: 2px solid;
    }
    &:after {
        height: 16px;
        border-left: 2px solid;
    }
`

const TodoAddForm = styled.form`
    position: absolute;
    width: 60%;

    input {
        width: 100%;
        padding: 0.6rem 0.8rem;
        border-radius: 5px;
        border: 1px solid ${({ theme }) => theme.secondary};
        background: ${({ theme }) => theme.primary};
        font-size: 1rem;
        transition: all 0.5s ease;
    }
`

const UndoneTasks = () => {
    const { todos } = useTodoState()
    const undoneTasks = todos.filter(({ done }) => !done).length
    return <span>{undoneTasks} TASKS</span>
}

const TodoAdd = () => {
    const { value, handleChange, reset } = useInput('')
    const [open, setOpen] = useState(false)

    const dispatch = useTodoDispatch()

    const handleToggleOpen = () => {
        setOpen(!open)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const todo = await createTodo(value)
            dispatch({ type: TodoActionTypes.ADD_TODO, payload: todo })
            reset()
            setOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TodoAddLayout>
            <UndoneTasks />
            <TodoAddButton open={open} onClick={handleToggleOpen}>
                {open ? 'CANCEL' : 'ADD NEW'}
            </TodoAddButton>
            {open && (
                <TodoAddForm onSubmit={handleSubmit}>
                    <input
                        placeholder={'할 일을 입력 후 Enter를 누르세요'}
                        value={value}
                        onChange={handleChange}
                        autoFocus
                        required
                    />
                </TodoAddForm>
            )}
        </TodoAddLayout>
    )
}

export default TodoAdd
