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


-- SELECT first_name, last_name, roles.title, departments.name, role_id, manager_id 
-- FROM ((employees INNER JOIN roles ON employees.role_id = roles.id)
-- INNER JOIN departments ON roles.department_id = departments.id)
-- WHERE roles.title NOT LIKE "%Manager";

-- UPDATE employees SET manager_id = 2;

-- SELECT * FROM employees;