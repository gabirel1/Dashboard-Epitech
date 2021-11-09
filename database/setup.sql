CREATE DATABASE IF NOT EXISTS DashboardDatabase;

USE DashboardDatabase;

CREATE TABLE USERS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mail VARCHAR(255),
    password VARCHAR(255),
    token VARCHAR(255),
);