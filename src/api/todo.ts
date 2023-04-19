import client from './apiConfig'
import { Todo, TodoState } from '../contexts/todoReducer'

const getTodos = (): Promise<TodoState> => client.get('/todos')
const createTodo = (text: string): Promise<Todo> => client.post('/todos', { text })
const deleteTodo = (id: number) => client.delete(`/todos/${id}`)
const updateTodo = (id: number, text: string, done: boolean): Promise<Todo> =>
    client.put(`/todos/${id}`, { text, done })

export { getTodos, createTodo, deleteTodo, updateTodo }
