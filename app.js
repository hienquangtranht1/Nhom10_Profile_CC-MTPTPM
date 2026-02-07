
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
