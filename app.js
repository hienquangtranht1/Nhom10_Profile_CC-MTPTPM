const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Kết nối MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Thay bằng user của bạn
    password: '',     // Thay bằng password của bạn
    database: 'todo_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Đã kết nối MySQL!');
});

// --- ROUTES ---

// 3. UPDATE Status (Toggle)
app.get('/update-status/:id/:status', (req, res) => {
    const { id, status } = req.params;
    const newStatus = status === 'pending' ? 'completed' : 'pending';
    const sql = "UPDATE tasks SET status = ? WHERE id = ?";
    db.query(sql, [newStatus, id], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// 3.1 UPDATE Content (Show Form)
app.get('/edit/:id', (req, res) => {
    const sql = "SELECT * FROM tasks WHERE id = ?";
    db.query(sql, [req.params.id], (err, results) => {
        if (err) throw err;
        if (results.length === 0) return res.redirect('/');

        const task = results[0];
        let formattedDate = '';

        // Format date server-side
        if (task.due_date) {
            const d = new Date(task.due_date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
        }

        res.render('edit', { task: task, formattedDate: formattedDate });
    });
});

// 3.2 UPDATE Content (Process Form)
app.post('/edit/:id', (req, res) => {
    const { title, description, due_date } = req.body;
    const sql = "UPDATE tasks SET title = ?, description = ?, due_date = ? WHERE id = ?";
    db.query(sql, [title, description, due_date, req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

