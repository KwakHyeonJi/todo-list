const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
app.use(cors());

app.use(express.json());

const api = require('./src/routes');
app.use('/api', api);

module.exports = app;
