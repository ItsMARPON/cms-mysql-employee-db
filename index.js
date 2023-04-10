// Include packages needed for this application
const inquirer = require("inquirer");
const art = require("./helper/helper");
const mysql = require("mysql2");
const Department = require("./lib/department");
const Role = require("./lib/role");
const Employee = require("./lib/employee");
let db = require("./config/connection");
require("dotenv").config();

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MYSQL2");
  menuQuestions();
});

const intro = async () => {
  let displayArt = art;
};
intro();

// An array of initial questions for start of application

const menuQuestions = async () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
        name: "menulist",
      },
    ])
    .then(async (data) => {
      if (data.menulist === "View All Employees") {
        queryAllEmployees();
      } else if (data.menulist === "Add Employee") {
        promptAddEmployee();
      } else if (data.menulist === "Update Employee Role") {
        promptUpdateEErole();
      } else if (data.menulist === "View All Roles") {
        queryAllRoles();
      } else if (data.menulist === "Add Role") {
        promptAddRole();
      } else if (data.menulist === "View All Departments") {
        queryAllDepartments();
      } else if (data.menulist === "Add Department") {
        promptAddDepartment();
      } else {
        process.exit();
      }
    });
};

// Functinon to Add Employee for adding new employees to the database
const promptAddEmployee = () => {
  // Generate questions for user to input for Add Employee
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstname",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastname",
      },
      {
        type: "list",
        message: "What is the employee's role?",
        choices: [
          { name: "Lawyer", value: 1 },
          { name: "Legal Manager", value: 2 },
          { name: "Accountant", value: 3 },
          { name: "Accounting Manager", value: 4 },
          { name: "Engineer", value: 5 },
          { name: "Engineer Manager", value: 6 },
          { name: "Salesperson", value: 7 },
          { name: "Sales Manager", value: 8 },
        ],
        name: "employeeRoles",
      },
      {
        type: "list",
        message: "Who is the Manager supervising the employee?",
        choices: [
          { name: "Song Xiong", value: 2 },
          { name: "Mary Yang", value: 4 },
          { name: "Yana Xiong", value: 6 },
          { name: "Zelda Xiong", value: 8 },
          { name: "Not Applicable", value: null },
        ],
        name: "supervisor",
      },
    ])
    .then(function (data) {
      let newEmployee = new Employee(
        data.firstname,
        data.lastname,
        data.employeeRoles,
        data.supervisor
      );

      // Using sql query to insert the data from user input from questions into employees table

      let sql = `INSERT INTO employees SET ?`;

      db.query(sql, newEmployee, function (err, results) {
        if (err) {
          console.log(err);
          throw err;
        }
        console.log("Successfully added new Employee");
        menuQuestions();
      });
    });
};

// Questions for update Employee Role
const promptUpdateEErole = () => {
  // Generate questions for the user to select employee and add new role

  db.query(
    `SELECT first_name, last_name FROM employees`,
    function (err, results) {
      if (err) {
        console.log(err);
        throw err;
      }

      const listEmployees = results.map(({ first_name, last_name }) => ({
        name: first_name + " " + last_name,
      }));

      db.query(`SELECT name FROM departments`, function (err, results) {
        if (err) {
          console.log(err);
          throw err;
        }

        const listDepartments = results.map(({ name }) => ({ name }));

        inquirer
          .prompt([
            {
              type: "list",
              message: "Which Employee's role do you want to update?",
              choices: listEmployees,
              name: "selectEmployee",
            },
            {
              type: "input",
              message:
                "What role do you want to assign to the selected Employee?",
              name: "newRole",
            },
            {
              type: "input",
              message: "What is the salary for the updated role?",
              name: "newSalary",
            },
            {
              type: "list",
              message: "What department does the role belong to?",
              choices: listDepartments,
              name: "selectDept",
            },
          ])
          .then((data) => {
            // Taking user addition of role and adding to the Roles table

            let dept = listDepartments.find((e) => e.name === data.selectDept);
            let indexOfDept = listDepartments.indexOf(dept) + 1;

            db.query(
              `INSERT INTO roles(title, salary, department_id) VALUES('${data.newRole}', '${data.newSalary}', '${indexOfDept}')`,
              function (err, results) {
                if (err) {
                  console.log(err);
                  throw err;
                }
                // Obtain the id (primary key) from roles table after adding the new role into table
                db.query(
                  `SELECT id FROM roles WHERE title = '${data.newRole}'`,
                  function (err, results) {
                    if (err) {
                      console.log(err);
                      throw err;
                    }
                    const roleId = results[0].id;

                    console.log(
                      "Successfully added a new role into Roles table"
                    );

                    // Once user selects employee from the list, use find() method to find the first element in the array that satisfies the testing function.
                    let employee = listEmployees.find(
                      (e) => e.name === data.selectEmployee
                    );
                    // After employee is provided, then use indexOf to find the index of employee
                    let indexOfEmployee = listEmployees.indexOf(employee) + 1;

                    const sql = `UPDATE employees SET role_id = ${roleId} WHERE id = ${indexOfEmployee}`;

                    db.query(sql, results, (err, results) => {
                      if (err) {
                        console.log(err);
                        throw err;
                      }
                      console.log(
                        "Successfully updated employee role in the Employees table"
                      );
                      menuQuestions();
                    });
                  }
                );
              }
            );
          });
      });
    }
  );
};

// // Function to Add a Role to the Roles table
const promptAddRole = () => {
  // display a list of departments available for user selection
  db.query(`SELECT name FROM departments`, function (err, results) {
    if (err) {
      console.log(err);
      throw err;
    }

    const listDepartments = results.map(({ name }) => ({ name }));

    // Generate questions for user input
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the role/title name?",
          name: "title",
        },
        {
          type: "input",
          message: "What is the salary?",
          name: "salary",
        },
        {
          type: "list",
          message: "What is the department?",
          choices: listDepartments,
          name: "listDepartments",
        },
      ])
      .then((data) => {
        // User selects department, use find() method to return the department in the array that satisfies the provided testing function.
        let dept = listDepartments.find((e) => e.name === data.listDepartments);
        // Find the index of the department in the array
        let indexOfDept = listDepartments.indexOf(dept) + 1;
        // create a new Role class with the user provided information
        const addRole = new Role(data.title, data.salary, indexOfDept);

        const newTitle = addRole.getTitle();
        const newSalary = addRole.getSalary();
        const newDepartment = addRole.getDepartmentId();

        sql = `INSERT INTO roles(title, salary, department_id) VALUES ("${newTitle}", ${newSalary}, ${newDepartment})`;

        db.query(sql, function (err, results) {
          if (err) {
            console.log(err);
            throw err;
          }
          console.log("Successfully added to Roles table");
          menuQuestions();
        });
      });
  });
};

// // Function to Add a Department
const promptAddDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the Department?",
        name: "departmentName",
      },
    ])
    .then((data) => {
      const addDepartment = new Department(data.departmentName);

      const newDepartment = addDepartment.getName();

      sql = `INSERT INTO departments(name) VALUES ("${newDepartment}")`;

      db.query(sql, function (err, results) {
        if (err) {
          console.log(err);
          throw err;
        }
        console.log("Successfully added to Departments table");
        menuQuestions();
      });
    });
};

// function to view All Employee data
const queryAllEmployees = () => {
  db.query(`SELECT manager_id FROM employees`, function (err, results) {
    if (err) {
      console.log(err);
      throw err;
    }
    let listIdSupervisors = results.filter((e) => e.manager_id !== null);

    let iterator = listIdSupervisors.values();
    for (const value of iterator){
    console.log(value, "This is the value method");      
    };



    // Need to figure out how to apply each supervisor id to find name
    db.query(`SELECT first_name FROM employees WHERE id = "1"`, function (err, results) {
      if (err) {
        console.log(err);
        throw err;
      }

      console.log(
        results,
        "This is the list of employees matching Supervisor Id"
      );

    //   const sql = `SELECT employees.id AS "Employee ID", employees.first_name AS 'First Name', employees.last_name AS 'Last Name', roles.title AS 'Role/Title', roles.salary AS 'Role Salary', departments.name AS 'Department Name', employees.manager_id AS 'Supervising Manager'
    // FROM ((employees
    // INNER JOIN roles ON employees.role_id = roles.id)
    // INNER JOIN departments ON roles.department_id = departments.id )`;

    //   db.query(sql, function (err, results) {
    //     if (err) {
    //       console.log(err);
    //       throw err;
    //     }
    //     console.table(results);
    //     menuQuestions();
    //   });
    });
  });
};

// // function to view all roles

function queryAllRoles() {
  const sql = `SELECT title AS 'Role/Title', salary AS 'Role Salary', departments.name AS 'Department Name'
    FROM (roles
    INNER JOIN departments ON roles.department_id = departments.id)`;

  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
      throw err;
    }
    console.table(results);
    menuQuestions();
  });
}

// // Function to view all departments
function queryAllDepartments() {
  const sql = `SELECT name AS 'Department Name' FROM departments`;

  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
      throw err;
    }
    console.table(results);
    menuQuestions();
  });
}
