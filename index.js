// Include packages needed for this application
const inquirer = require("inquirer");
const mysql = require("mysql2");
const Departments = require("./lib/department");
const Roles = require("./lib/role");
const Employees = require("./lib/employee");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "babyshark",
    database: "cms_db",
  },
  console.log(`Connected to the cms_db database.`)
);

//The user input Employee Data
let employeeData = [];

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
menuQuestions();
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
        choices: [queryAllRoles()],
        name: "employeeRoles",
      },
      {
        type: "input",
        message: "Who is the Manager supervising the employee?",
        name: "supervisor",
      },
    ])
    .then((data) => {
      const addEmployee = new Employees(
        data.firstname,
        data.lastname,
        data.employeeRoles,
        data.supervisor,
      );
      employeeData.push(addEmployee);
      console.log(employeeData);
      menuQuestions();
    });
};

// Questions for update Employee Role

const promptUpdateEErole = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which Employee's role do you want to update?",
        choices: [queryAllEmployees],
        name: "selectemployee",
      },
      {
        type: "input",
        message: "What role do you want to assign to the selected Employee?",
        name: "newrole",
      },
    ])
    .then((data) => {
      const updateEERole = new Employees(data.selectemployee, data.newrole);
      employeeData.push(updateEERole);
      menuQuestions();
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
      menuQuestions();
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
      menuQuestions();
    });
};

// Query database
// function to view All Employees
function queryAllEmployees() {
  db.query("SELECT * FROM employees", function (err, results) {
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
