SELECT employees.id AS "Employee ID", employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Role/Title", roles.salary AS "Role Salary", departments.name AS "Department Name", employees.manager_id AS "Supervising Manager"
FROM ((employees
INNER JOIN roles ON employees.role_id = roles.id)
INNER JOIN departments ON roles.department_id = departments.id );