const express = require('express');
const router = express.Router();

const ctrl = require('./ctrl');

router.get('/test', ctrl.test);
router.get('/getTodos', ctrl.getTodos);
router.post('/saveTodos', ctrl.saveTodos);

module.exports = router;
