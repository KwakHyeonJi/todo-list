const express = require('express')
const router = express.Router()

const { getTodos, createTodo, deleteTodo, updateTodo } = require('./ctrl')

router.get('/todos', getTodos)
router.post('/todos', createTodo)
router.delete('/todos/:id', deleteTodo)
router.put('/todos/:id', updateTodo)

module.exports = router
