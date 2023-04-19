import { ThemeProvider } from './contexts/themeContext'
import { TodoProvider } from './contexts/todoContext'
import GlobalStyle from './styles/GlobalStyle'
import Todo from './components/Todo'

const App = () => {
    return (
        <ThemeProvider>
            <GlobalStyle />
            <TodoProvider>
                <Todo />
            </TodoProvider>
        </ThemeProvider>
    )
}

export default App
