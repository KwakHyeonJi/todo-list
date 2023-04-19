import styled from 'styled-components'

import ThemeToggle from './ThemeToggle'

const TodoHeaderLayout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 0;
    font-weight: 600;

    & > section {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .day,
    .month {
        font-size: 2.8rem;
    }

    .year {
        padding: 4px 12px;
        border-radius: 50px;
        background: ${({ theme }) => theme.text};
        color: ${({ theme }) => theme.primary};
        font-size: 1.4rem;
        transition: all 0.5s ease;
    }

    .weekday {
        font-size: 1.4rem;
    }
`

const TodoHeader = () => {
    const today = new Date()
    const year = today.toLocaleDateString('en-US', { year: 'numeric' })
    const day = today.toLocaleDateString('en-US', { day: '2-digit' })
    const month = today.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
    const weekday = today.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()

    return (
        <TodoHeaderLayout>
            <section>
                <span className='day'>{day}</span>
                <span className='month'>{month}</span>
                <span className='year'>{year}</span>
            </section>
            <section>
                <span className='weekday'>{weekday}</span>
                <ThemeToggle />
            </section>
        </TodoHeaderLayout>
    )
}

export default TodoHeader
