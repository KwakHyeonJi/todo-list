import { useEffect } from 'react'
import styled from 'styled-components'

import { useTodoDispatch } from '../contexts/todoContext'
import { TodoActionTypes } from '../contexts/todoReducer'
import { getTodos } from '../api/todo'
import TodoHeader from './TodoHeader'
import TodoList from './TodoList'
import TodoAdd from './TodoAdd'

const TodoLayout = styled.div`
    position: relative;
    width: 700px;
    height: 750px;
    padding: 0 40px;
    margin: 80px auto;
    border-radius: 20px;
    background: ${({ theme }) => theme.primary};
    box-shadow: 2px 4px 12px rgb(0, 0, 0, 0.4);
    transition: background 0.5s ease;
`

const Todo = () => {
    const dispatch = useTodoDispatch()

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const { todos } = await getTodos()
                dispatch({ type: TodoActionTypes.SET_TODOS, payload: { todos } })
            } catch (error) {
                console.log(error)
            }
        }
        loadTodos()
    }, [])

    return (
        <TodoLayout>
            <TodoHeader />
            <TodoList />
            <TodoAdd />
        </TodoLayout>
    )
}

export default Todo
