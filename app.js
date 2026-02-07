 feature/HuynhThanhPhuc-2280602431/search

// 1. READ (Lấy danh sách, bao gồm Search và Filter)
app.get('/', (req, res) => {
    const { search, date } = req.query;
    let sql = "SELECT * FROM tasks WHERE 1=1";
    let params = [];

    if (search) {
        sql += " AND title LIKE ?";
        params.push(`%${search}%`);
    }

    if (date) {
        // Vì due_date là DATETIME (có cả giờ phút), nên ta dùng hàm DATE() để chỉ so sánh phần ngày
        sql += " AND DATE(due_date) = ?";
        params.push(date);
    }

    sql += " ORDER BY created_at DESC";

    db.query(sql, params, (err, results) => {
        if (err) throw err;
        res.render('index', { tasks: results });
    });
});
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

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


app.get('/delete/:id', (req, res) => {
    const sql = "DELETE FROM tasks WHERE id = ?";
    db.query(sql, [req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(3000, () => console.log('Server chạy tại http://localhost:3000'));
 develop
