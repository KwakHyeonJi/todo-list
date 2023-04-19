import styled from 'styled-components'
import { MdLightMode, MdModeNight } from 'react-icons/md'

import { Theme, useTheme } from '../contexts/themeContext'

const ThemeToggleLayout = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.text};
    transition: color 0.5s ease;
`

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <ThemeToggleLayout onClick={toggleTheme}>
            {theme === Theme.LIGHT ? <MdLightMode size={20} /> : <MdModeNight size={20} />}
        </ThemeToggleLayout>
    )
}

export default ThemeToggle
