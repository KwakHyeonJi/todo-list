import { createContext, useState, useContext } from 'react'
import { ThemeProvider as StyledProvider } from 'styled-components'

import { lightTheme, darkTheme } from '../styles/theme'

export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
}

interface ThemeContextState {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextState | null>(null)

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>((window.localStorage.getItem('theme') as Theme) || Theme.LIGHT)

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <StyledProvider theme={theme === Theme.LIGHT ? lightTheme : darkTheme}>{children}</StyledProvider>
        </ThemeContext.Provider>
    )
}

const useTheme = () => {
    const themeContext = useContext(ThemeContext)

    if (!themeContext) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }

    const { theme, setTheme } = themeContext

    const toggleTheme = () => {
        const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
        setTheme(newTheme)
        window.localStorage.setItem('theme', newTheme)
    }

    return { theme, toggleTheme }
}

export { ThemeProvider, useTheme }
