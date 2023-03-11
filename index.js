// Include packages needed for this application
const inquirer = require("inquirer");
const mysql = require("mysql2");

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

  // Query database
db.query("SELECT * FROM employees", function (err, results) {
    console.log(results);
  });

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
        if (data.menulist === "Add Employee") {
          promptAddEmployee();
        } else if (data.menulist === " Update Employee Role") {
          promptUpdateEErole();
        } else if (data.menulist === "View All Roles") {
          viewAllRoles();
        } else if (data.menulist === "Add Role") {
          promptAddRole();
        } else if (data.menulist === "View All Departmnts") {
          viewAllDepartments();
        } else if (data.menulist === "Add Department") {
          promptAddDepartment();
        } else {
          process.exit();
        }
    //   const roles = await Roles.findAll({});
      console.log(roles);
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
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Accounting Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer",
        ],
        name: "employeeRoles",
      },
      {
        type: "input",
        message: "Who is the Manager supervising the employee?",
        name: "supervisor",
      },
    ])
    .then((data) => {
      const addEmployee = new Employee(
        data.first_name,
        data.last_name,
        data.manager_id
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
        choices: ["List of Employees"],
        name: "selectemployee",
      },
      {
        type: "input",
        message: "What role do you want to assign to the selected Employee?",
        name: "newrole",
      },
    ])
    .then((data) => {
      const updateRole = new Employee(data.role_id);
      employeeData.push(updateRole);
      menuQuestions();
    });
};

// function to view all roles

const viewAllRoles = () => {
  inquirer
    .prompt([
      {
        type: "list",
        choices: ["List of Roles"],
        name: "allRoles",
      },
    ])
    .then((data) => {
      console.log(data);
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
        choices: ["List of Departments"],
        name: "departments",
      },
    ])
    .then((data) => {
      const addRole = new Role(data.title, data.salary, data.department_id);
      employeeData.push(addRole);
      console.log(employeeData);
      menuQuestions();
    });
};

// function to view all departments
const viewAllDepartments = () => {
  inquirer
    .prompt([
      {
        type: "list",
        choices: ["List of Departments"],
        name: "allDepartments",
      },
    ])
    .then((data) => {
      console.log(data);
    });
};

// Function to Add a Department
const promptAddDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the Department?",
        name: "departmentname",
      },
    ])
    .then((data) => {
      const addDepartment = new Department(data.name);
      employeeData.push(addDepartment);
      console.log(employeeData);
      menuQuestions();
    });
};
