// Include packages needed for this application
const inquirer = require("inquirer");
const mysql = require("mysql2");
const Departments = require("./lib/department");
const Roles = require("./lib/role");
const Employees = require("./lib/employee");
const Employee = require("./lib/employee");
let db = require("./config/connection");
require("dotenv").config();

//The user input Employee Data
let employeeData = [];

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MYSQL2");
  menuQuestions();
});

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
        // } else if (data.menulist === "View All Roles") {
        //   queryAllRoles();
        // } else if (data.menulist === "Add Role") {
        //   promptAddRole();
        // } else if (data.menulist === "View All Departments") {
        //   queryAllDepartments();
        // } else if (data.menulist === "Add Department") {
        //   promptAddDepartment();
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
        employeeData.push(results);
        console.log(results, "Successfully added new Employee");
        menuQuestions();
      });
    });
};

// Questions for update Employee Role
const promptUpdateEErole = () => {
  // Generate questions for the user to select employee and add new role
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which Employee's role do you want to update?",
        choices: [
          { name: "Isla Xiong", value: 1 },
          { name: "Song Xiong", value: 2 },
          { name: "Pong Xiong", value: 3 },
          { name: "Mary Yang", value: 4 },
          { name: "Theo Xiong", value: 5 },
          { name: "Yana Xiong", value: 6 },
          { name: "Oliver Xiong", value: 7 },
          { name: "Zelda Xiong", value: 8 },
        ],
        name: "selectEmployee",
      },
      {
        type: "input",
        message: "What role do you want to assign to the selected Employee?",
        name: "newRole",
      },
    ])
    .then((data) => {
      // Taking user addition of role and adding to the Roles table
      db.query(
        `INSERT INTO roles(title) VALUES('${data.newRole}')`,
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
              
              const roleId = results[0];

              const newRoleId = results[0].split(':');
              
              console.log(roleId);
              // console.log("Successfully added a new role into Roles table");

              const sql = `UPDATE employees SET role_id = ${newRoleId} WHERE id = ${data.selectEmployee}`;

              db.query(sql, results, (err, result) => {
                if (err) {
                  console.log(err);
                  throw err;
                }
                console.log("Successfully updated employee role");
              });
            }
          );
        }
      );
    });
};

// // Function to Add a Role
// const promptAddRole = () => {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         message: "What is the role/title name?",
//         name: "title",
//       },
//       {
//         type: "input",
//         message: "What is the salary?",
//         name: "salary",
//       },
//       {
//         type: "list",
//         message: "What is the department?",
//         choices: [queryAllDepartments()],
//         name: "listdepartments",
//       },
//     ])
//     .then((data) => {
//       const addRole = new Roles(data.title, data.salary, data.listdepartments);
//       // Need code to add role to table Departments
//       employeeData.push(addRole);
//       console.log(employeeData);
//       // menuQuestions();
//     });
// };

// // Function to Add a Department
// const promptAddDepartment = () => {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         message: "What is the name of the Department?",
//         name: "departmentName",
//       },
//     ])
//     .then((data) => {
//       const addDepartment = new Departments(data.departmentName);
//       employeeData.push(addDepartment);
//       console.log(employeeData);
//       // menuQuestions();
//     });
// };

// // Query database
// // function to view All Employee data
// const queryAllEmployees = () => {
//   let sql = `SELECT employees.id AS "Employee ID", employees.first_name AS 'First Name', employees.last_name AS 'Last Name', roles.title AS 'Role/Title', roles.salary AS 'Role Salary', departments.name AS 'Department Name', employees.manager_id AS 'Supervising Manager'
//     FROM ((employees
//     INNER JOIN roles ON employees.role_id = roles.id)
//     INNER JOIN departments ON roles.department_id = departments.id )`;

//   db.query(sql, function (err, results))=>{
//     console.log("results:", results);
//     db.end();
//   };

// // function to view all roles

// function queryAllRoles() {
//   db.query("SELECT * FROM roles", function (err, results) {
//     console.log("results:", results);
//     db.end();
//   });
// }

// // Function to view all departments
// function queryAllDepartments() {
//   db.query("SELECT * FROM departments", function (err, results) {
//     console.log("results:", results);
//     db.end();
//   });
// }

// // Function to view only titles of roles
// function queryTitleInRoles() {
//   db.query("SELECT roles.title FROM roles", function (err, results) {
//     console.log("results:", results);
//   });
// }
