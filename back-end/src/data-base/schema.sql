DROP DATABASE IF EXISTS kino_order_db;

CREATE DATABASE kino_order_db;

USE kino_order_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    hashed_password VARCHAR(225) NOT NULL
);