DROP DATABASE IF EXISTS gtfo_db;
CREATE DATABASE gtfo_db;

USE gtfo_db;

CREATE TABLE users (
user_id INT(11) AUTO_INCREMENT NOT NULL,
name VARCHAR(255) NOT NULL,
PRIMARY KEY(user_id)
);

