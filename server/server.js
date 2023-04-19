const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()

const api = require('./src/routes')

app.use(express.json())
app.use('/api', api)

module.exports = app
