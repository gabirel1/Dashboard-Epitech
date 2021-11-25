CREATE DATABASE IF NOT EXISTS DashboardDatabase;

USE DashboardDatabase;

CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  mail VARCHAR(255) UNIQUE,
  google_mail VARCHAR(255) UNIQUE,
  google_token VARCHAR(255),
  facebook_mail VARCHAR(255) UNIQUE,
  facebook_token VARCHAR(255),
  apple_mail VARCHAR(255) UNIQUE,
  apple_token VARCHAR(255),
  office_mail VARCHAR(255) UNIQUE,
  office_token VARCHAR(255),
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  token VARCHAR(255),
  token_created_at DATETIME,
  PRIMARY KEY (id)
);

INSERT INTO users (mail, username, password) VALUES ('mail@mail.com', 'testUser1', 'password');