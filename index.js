// Include packages needed for this application
const inquirer = require("inquirer");
const mysql = require("mysql2");
const Departments = require("./lib/department");
const Roles = require("./lib/role");
const Employees = require("./lib/employee");
const Employee = require("./lib/employee");
let db = require('./config/connection');
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
      //   const roles = await Roles.findAll({});
      //   console.log(roles);
    });
};

// Questions for Add Employee
const promptAddEmployee = () => {
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
        choices: ['Lawyer', 'Legal Manager', 'Accountant', 'Accounting Manager', 'Engineer', 'Engineer Manager', 'Salesperson', 'Sales Manager'],
        name: "employeeRoles",
      },
      {
        type: "input",
        message: "Who is the Manager supervising the employee (if none enter null)?",
        name: "supervisor",
      },
    ])
    .then (function (data) {
      let newEmployee = new Employee(
        data.firstname,
        data.lastname,
        data.employeesRoles,
        data.supervisor
      );

      let sql = `INSERT INTO employees SET ?`;

      let query = db.query(sql, newEmployee, (err, results) => {
        if (err) throw err;
        console.log(results);
        console.log("Successfully Added Employee");
      });
      // employeeData.push(newEmployee);
      // console.log('Pushed new employee into array');
    });
};

// Questions for update Employee Role

const promptUpdateEErole = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which Employee's role do you want to update?",
        choices: [queryAllEmployees()],
        name: "selectemployee",
      },
      {
        type: "input",
        message: "What role do you want to assign to the selected Employee?",
        name: "newrole",
      },
    ])
    .then((data) => {
      const addEmployee = new Employee(data.selectemployee, data.newrole);
      console.log(data);
      employeeData.push(addEmployee);
      // menuQuestions();
    });
};

// Function to Add a Role
const promptAddRole = () => {
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
        choices: [queryAllDepartments()],
        name: "listdepartments",
      },
    ])
    .then((data) => {
      const addRole = new Roles(data.title, data.salary, data.listdepartments);
      // Need code to add role to table Departments
      employeeData.push(addRole);
      console.log(employeeData);
      // menuQuestions();
    });
};

// Function to Add a Department
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
      const addDepartment = new Departments(data.departmentName);
      employeeData.push(addDepartment);
      console.log(employeeData);
      // menuQuestions();
    });
};

// Query database
// function to view All Employees
function queryAllEmployees() {
  let sql = `SELECT employees.id AS "Employee ID", employees.first_name AS 'First Name', employees.last_name AS 'Last Name', roles.title AS 'Role/Title', roles.salary AS 'Role Salary', departments.name AS 'Department Name', employees.manager_id AS 'Supervising Manager'
  FROM ((employees
  INNER JOIN roles ON employees.role_id = roles.id)
  INNER JOIN departments ON roles.department_id = departments.id )`;

  db.query(sql, function (err, results) {
    console.log("results:", results);
    db.end();
  });
}

// function to view all roles

function queryAllRoles() {
  db.query("SELECT * FROM roles", function (err, results) {
    console.log("results:", results);
    db.end();
  });
}

// Function to view all departments
function queryAllDepartments() {
  db.query("SELECT * FROM departments", function (err, results) {
    console.log("results:", results);
    db.end();
  });
}

// Function to view only titles of roles
function queryTitleInRoles() {
  db.query("SELECT roles.title FROM roles", function (err, results) {
    console.log("results:", results);
  });
}
