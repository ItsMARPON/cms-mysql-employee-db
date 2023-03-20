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

INSERT INTO employees(first_name, last_name, role_id)
VALUES
("Isla", "Xiong", 1),
("Song", "Xiong", 2),
("Pong", "Xiong", 3),
("Mary", "Yang", 4),
("Theo", "Xiong", 5),
("Yana", "Xiong", 6),
("Oliver", "Xiong", 7),
("Zelda", "Xiong", 8);


