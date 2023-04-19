import styled from 'styled-components'
import { MdDeleteForever } from 'react-icons/md'

import { useTodoDispatch } from '../contexts/todoContext'
import { TodoActionTypes } from '../contexts/todoReducer'
import { deleteTodo, updateTodo } from '../api/todo'
import CheckBox from './CheckBox'

const TodoItemLayout = styled.li`
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    padding: 1rem 0;

    &:hover button {
        display: flex;
    }
`

const Text = styled.span<{ done: boolean }>`
    overflow: hidden;
    text-overflow: ellipsis;
    width: 90%;
    padding: 0 1.5rem;
    color:  ${({ theme, done }) => (done ? theme.secondary : theme.text)}};
    font-size: 1.2rem;
    line-height: normal;
    white-space: nowrap;
    transition: color 0.5s ease;
`

const DeleteButton = styled.button`
    display: none;
    align-items: center;
    color: ${({ theme }) => theme.secondary};

    &:hover {
        color: ${({ theme }) => theme.danger};
    }
`

interface TodoItemProps {
    id: number
    text: string
    done: boolean
}

const TodoItem = ({ id, text, done }: TodoItemProps) => {
    const dispatch = useTodoDispatch()

    const handleToggle = async () => {
        try {
            const result = await updateTodo(id, text, !done)
            dispatch({
                type: TodoActionTypes.UPDATE_TODO,
                payload: { id: result.id, text: result.text, done: result.done },
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        try {
            await deleteTodo(id)
            dispatch({ type: TodoActionTypes.REMOVE_TODO, payload: { id } })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TodoItemLayout>
            <CheckBox checked={done} onChange={handleToggle} />
            <Text done={done}>{text}</Text>
            <DeleteButton type='button' onClick={handleDelete}>
                <MdDeleteForever size={25} />
            </DeleteButton>
        </TodoItemLayout>
    )
}

export default TodoItem
