import styled from 'styled-components'

import { useTodoState } from '../contexts/todoContext'
import TodoItem from './TodoItem'

const TodoListLayout = styled.ul`
    overflow-y: scroll;
    height: 65%;
`

const TodoList = () => {
    const { todos } = useTodoState()

    return (
        <TodoListLayout>
            {todos.map(({ id, text, done }) => (
                <TodoItem key={id} id={id} text={text} done={done} />
            ))}
        </TodoListLayout>
    )
}

export default TodoList
