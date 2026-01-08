const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',   // your MySQL username
    password: 'root',   // your MySQL password
    database: 'hrm_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// CRUD APIs
app.get('/departments', (req, res) => {
    db.query('SELECT * FROM departments', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/departments', (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO departments(name) VALUES(?)', [name], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, name });
    });
});

app.put('/departments/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.query('UPDATE departments SET name=? WHERE id=?', [name, id], (err, results) => {
        if (err) throw err;
        res.json({ id, name });
    });
});

app.delete('/departments/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM departments WHERE id=?', [id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Deleted successfully' });
    });
});

/* =========================
   ROLE MANAGEMENT APIs
========================= */

// Get all active roles
app.get('/roles', (req, res) => {
    db.query(
        'SELECT * FROM roles WHERE status = true',
        (err, results) => {
            if (err) throw err;
            res.json(results);
        }
    );
});

// Add role (Admin only – UI level for now)
app.post('/roles', (req, res) => {
    const { role_name, description } = req.body;

    db.query(
        'INSERT INTO roles (role_name, description) VALUES (?, ?)',
        [role_name, description],
        (err, results) => {
            if (err) throw err;
            res.json({
                message: 'Role added successfully',
                role_id: results.insertId
            });
        }
    );
});

// Update role
app.put('/roles/:id', (req, res) => {
    const { role_name, description } = req.body;
    const { id } = req.params;

    db.query(
        'UPDATE roles SET role_name=?, description=? WHERE role_id=?',
        [role_name, description, id],
        (err) => {
            if (err) throw err;
            res.json({ message: 'Role updated successfully' });
        }
    );
});

// Soft delete role
app.delete('/roles/:id', (req, res) => {
    const { id } = req.params;

    db.query(
        'UPDATE roles SET status=false WHERE role_id=?',
        [id],
        (err) => {
            if (err) throw err;
            res.json({ message: 'Role deleted (soft delete)' });
        }
    );
});


app.listen(5000, () => console.log('Server running on port 5000'));


