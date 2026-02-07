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

// 4. DELETE
app.get('/delete/:id', (req, res) => {
    const sql = "DELETE FROM tasks WHERE id = ?";
    db.query(sql, [req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(3000, () => console.log('Server chạy tại http://localhost:3000'));