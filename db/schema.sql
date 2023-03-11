DROP DATABASE if exists cms_db;

CREATE DATABASE cms_db;

USE cms_db;

CREATE TABLE departments(id INT NOT NULL PRIMARY KEY auto_increment,
name VARCHAR(30) UNIQUE);

CREATE TABLE roles(id INT NOT NULL PRIMARY KEY auto_increment,
title VARCHAR(30), salary DECIMAL, department_id INT,
FOREIGN KEY (department_id) references departments(id));

CREATE TABLE employees(id INT NOT NULL PRIMARY KEY auto_increment, first_name VARCHAR(30), last_name VARCHAR(30), role_id INT, 
FOREIGN KEY (role_id) references roles(id), manager_id INT,
FOREIGN KEY (manager_id) references employees(id));