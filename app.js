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

// 2. CREATE
app.post('/add', (req, res) => {
    const { title, due_date } = req.body;
    const description = req.body.description || '';
    const sql = "INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)";
    db.query(sql, [title, description, due_date], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});
