CREATE DATABASE IF NOT EXISTS todo_db;
USE todo_db;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    due_date DATETIME, -- Đã sửa từ DATE thành DATETIME để lưu được cả giờ
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);