SELECT E.id AS "Employee ID", 
E.first_name AS "First Name", 
E.last_name AS "Last Name", 
R.title AS "Role/Title", 
R.salary AS "Role Salary", 
D.name AS "Department Name", 
E.manager_id AS "Supervising Manager"
FROM ((employees E
INNER JOIN roles R ON E.role_id = R.id)
INNER JOIN departments D ON R.department_id = D.id );


UPDATE employees
SET manager_id = 2
WHERE id = 1;

UPDATE employees
SET manager_id = 4
WHERE id = 3;

UPDATE employees
SET manager_id = 6
WHERE id = 5;

UPDATE employees
SET manager_id = 8
WHERE id = 7;

SELECT E.id AS "Employee ID", 
E.first_name AS "First Name", 
E.last_name AS "Last Name", 
R.title AS "Role/Title", 
R.salary AS "Role Salary", 
D.name AS "Department Name", 
E.manager_id AS "Supervising Manager"
FROM ((employees E
INNER JOIN roles R ON E.role_id = R.id)
INNER JOIN departments D ON R.department_id = D.id );


