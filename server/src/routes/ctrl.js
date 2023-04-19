const db = require('../config/db')

const getTodos = async (_, res) => {
    try {
        const sql = 'SELECT * FROM todos'
        const conn = await db.getConnection()
        const [result] = await conn.query(sql)

        conn.release()

        res.status(200).json({ todos: result })
    } catch (error) {
        console.error('데이터 조회 실패:', error)
        res.status(500).json({ error: '서버 오류' })
    }
}

const createTodo = async (req, res) => {
    const { text } = req.body
    if (!text) {
        res.status(400).json({ error: '입력 내용 누락' })
        return
    }

    try {
        const sql = 'INSERT INTO todos (text, done) VALUES (?, ?)'
        const done = false
        const conn = await db.getConnection()
        const [{ insertId }] = await conn.query(sql, [text, done])

        conn.release()

        res.status(201).json({ id: insertId, text, done })
    } catch (error) {
        console.error('데이터 삽입 실패:', error)
        res.status(500).json({ error: '서버 오류' })
    }
}

const deleteTodo = async (req, res) => {
    const { id } = req.params

    try {
        const sql = 'DELETE FROM todos WHERE id = ?'
        const conn = await db.getConnection()

        await conn.query(sql, id)
        conn.release()

        res.status(204).json()
    } catch (error) {
        console.error('데이터 삭제 실패:', error)
        res.status(500).json({ error: '서버 오류' })
    }
}

const updateTodo = async (req, res) => {
    const { id } = req.params
    const { text, done } = req.body

    if (!text) {
        res.status(400).json({ error: '입력 내용 누락' })
        return
    }

    try {
        const sql = 'UPDATE todos SET text = ?, done = ? WHERE id = ?'
        const conn = await db.getConnection()
        await conn.query(sql, [text, done, id])

        conn.release()

        res.status(200).json({ id: Number(id), text, done })
    } catch (error) {
        console.error('데이터 수정 실패:', error)
        res.status(500).json({ error: '서버 오류' })
    }
}

module.exports = { getTodos, createTodo, deleteTodo, updateTodo }
