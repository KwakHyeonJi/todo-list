export interface Todo {
    id: number
    text: string
    done: boolean
}

export interface TodoState {
    todos: Todo[]
}

export enum TodoActionTypes {
    SET_TODOS = 'SET_TODOS',
    ADD_TODO = 'ADD_TODO',
    REMOVE_TODO = 'REMOVE_TODO',
    UPDATE_TODO = 'UPDATE_TODO',
}

interface SetTodoAction {
    type: TodoActionTypes.SET_TODOS
    payload: TodoState
}

interface AddTodoAction {
    type: TodoActionTypes.ADD_TODO
    payload: Todo
}

interface RemoveTodoAction {
    type: TodoActionTypes.REMOVE_TODO
    payload: {
        id: number
    }
}

interface UpdateTodoAction {
    type: TodoActionTypes.UPDATE_TODO
    payload: Todo
}

export type TodoAction = SetTodoAction | AddTodoAction | RemoveTodoAction | UpdateTodoAction

const todoReducer = (state: TodoState, action: TodoAction) => {
    switch (action.type) {
        case TodoActionTypes.SET_TODOS:
            return { ...state, todos: action.payload.todos }
        case TodoActionTypes.ADD_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    { id: action.payload.id, text: action.payload.text, done: action.payload.done },
                ],
            }
        case TodoActionTypes.UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload.id
                        ? { ...todo, text: action.payload.text, done: action.payload.done }
                        : todo
                ),
            }
        case TodoActionTypes.REMOVE_TODO:
            return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload.id) }
        default:
            return state
    }
}

export default todoReducer
