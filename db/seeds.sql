INSERT INTO departments(name)
VALUES
("Legal"),
("Finance"),
("IT"),
("Sales");


INSERT INTO roles(title, salary, department_id)
VALUES
("Lawyer", 110000, 1),
("Legal Manager", 150000, 1),
("Accountant", 90000, 2),
("Accounting Manager", 120000, 2),
("Engineer", 110000, 3),
("Engineer Manager", 150000, 3),
("Salesperson", 50000, 4),
("Sales Manager", 70000, 4);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
("Isla", "Xiong", 1, 2),
("Song", "Xiong", 2, NULL),
("Pong", "Xiong", 3, 4),
("Mary", "Yang", 4, NULL),
("Theo", "Xiong", 5, 6),
("Yana", "Xiong", 6, NULL),
("Oliver", "Xiong", 7, 8),
("Zelda", "Xiong", 8, NULL);


