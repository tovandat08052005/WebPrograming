const express = require('express');
const router = express.Router();
const db = require('../configs/database');

router.get('/', (req, res) => {
    db.query('SELECT * FROM todos', (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).send('Internal server error');
        }
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { title, completed } = req.body;
    const query = 'INSERT INTO todos (title, completed) VALUES (?, ?)';
    db.query(query, [title, completed || false], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).send('Internal server error');
        }
        const newTodo = { id: results.insertId, title, completed: completed || false };
        res.status(201).json(newTodo);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const query = 'UPDATE todos SET title = ?, completed = ? WHERE id = ?';

    db.query(query, [title, completed, id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).send('Internal server error');
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ id: parseInt(id), title, completed });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM todos WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).send('Internal server error');
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(204).send();
    });
});

module.exports = router;

