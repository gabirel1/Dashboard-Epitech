CREATE DATABASE IF NOT EXISTS DashboardDatabase;

USE DashboardDatabase;

CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  mail VARCHAR(255) UNIQUE,
  google_mail VARCHAR(255) UNIQUE,
  facebook_mail VARCHAR(255) UNIQUE,
  apple_mail VARCHAR(255) UNIQUE,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255),
  token VARCHAR(255),
  token_created_at DATETIME,
  PRIMARY KEY (id)
);