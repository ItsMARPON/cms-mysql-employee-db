// Include packages needed for this application
const inquirer = require("inquirer");
const mysql = require("mysql2");
const Department = require("./lib/department");
const Role = require("./lib/role");
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
      } else if (data.menulist === "View All Roles") {
        queryAllRoles();
      } else if (data.menulist === "Add Role") {
        promptAddRole();
      } else if (data.menulist === "View All Departments") {
        queryAllDepartments();
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
              const roleId = results[0].id;

              console.log("Successfully added a new role into Roles table");

              const sql = `UPDATE employees SET role_id = ${roleId} WHERE id = ${data.selectEmployee}`;

              db.query(sql, results, (err, results) => {
                if (err) {
                  console.log(err);
                  throw err;
                }
                console.log(results, "Successfully updated employee role in the Employees table");
                menuQuestions();
              });
            }
          );
        }
      );
    });
};

// // Function to Add a Role to the Roles table
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
        choices: [{name: "Legal", value: 1},{name: "Finance", value: 2}, {name: "IT", value: 3},{name: "Sales", value: 4},
        ],
        name: "listDepartments",
      },
    ])
    .then((data) => {
      const addRole = new Role(data.title, data.salary, data.listDepartments);
      console.log(addRole, "This is Lib");

      Role.prototype.addInfo = function(){
        const addTitle = this.title;
        console.log(addTitle, "this is addTitle()");
      }
      addRole.addInfo();

      // for(let i =0 ; i < results.length; i ++){
      //   const addTitle = results[i].title;
      //   const addSalary = results[i].salary;
      //   const addDepartment = results[i].listDepartments;
      // db.query(`INSERT INTO roles VALUES ${addRole}`, function (err, results){
      //   if(err){
      //     console.log(err)
      //     throw err;
      //   }
      // })
    });
};

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


// // function to view All Employee data
const queryAllEmployees = () => {
  const sql = `SELECT employees.id AS "Employee ID", employees.first_name AS 'First Name', employees.last_name AS 'Last Name', roles.title AS 'Role/Title', roles.salary AS 'Role Salary', departments.name AS 'Department Name', employees.manager_id AS 'Supervising Manager'
    FROM ((employees
    INNER JOIN roles ON employees.role_id = roles.id)
    INNER JOIN departments ON roles.department_id = departments.id )`;

      db.query(sql, function (err, results){
        if(err){
          console.log(err)
          throw err;
        }
        console.table(results);
        menuQuestions();
      })
      
    };
// // function to view all roles

function queryAllRoles() {
  const sql = `SELECT title AS 'Role/Title', salary AS 'Role Salary', departments.name AS 'Department Name'
    FROM (roles
    INNER JOIN departments ON roles.department_id = departments.id)`;

  db.query(sql, function (err, results) {
   if(err){
    console.log(err)
    throw err;
   }
   console.table(results);
   menuQuestions();
  });
};

// // Function to view all departments
function queryAllDepartments() {
  const sql = `SELECT name AS 'Department Name' FROM departments`;

  db.query(sql, function (err, results) {
   if(err){
    console.log(err)
    throw err;
   }
   console.table(results);
   menuQuestions();
  });
}


