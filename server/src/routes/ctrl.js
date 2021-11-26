const db = require('../config/db');

const test = (req, res) => {
  db.query('SELECT result FROM Test;', (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send(err);
    }
  });
};

const getTodos = (req, res) => {
  db.query('SELECT * FROM Todos;', (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send(err);
    }
  });
};

const saveTodos = (req, res) => {
  db.query('TRUNCATE Todos', (err) => {
    if (!err) {
      const todos = req.body.todos;
      if (todos.length !== 0) {
        const values = [];
        todos.map((todo) => values.push(Object.values(todo)));
        db.query(
          'INSERT INTO Todos (idx, text, done) VALUES ?;',
          [values],
          (err) => {
            if (!err) {
              res.send({ success: true });
            } else {
              res.send({ success: false, msg: err.message });
            }
          }
        );
      } else {
        res.send({ success: true });
      }
    } else {
      res.send({ success: false, msg: err.message });
    }
  });
};

module.exports = { test, getTodos, saveTodos };
