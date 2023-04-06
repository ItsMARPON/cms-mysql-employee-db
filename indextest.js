// Include packages needed for this application
const inquirer = require("inquirer");
const mysql = require("mysql2");
const Departments = require("./lib/department");
const Roles = require("./lib/role");
const Employees = require("./lib/employee");
const Employee = require("./lib/employee");
let db = require("./config/connection");
require("dotenv").config();



db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MYSQL2");
});


//   const sql = "UPDATE employees SET role_id = ?, WHERE id = ?";

//   const newEmployeeRole = employeeData.map((newRole) => {
//     return newRole;
//   });

  // db.query(`UPDATE employees 
  //           SET role_id = 9
  //           WHERE id = 1`,(err, result) => {
  //   if (err) {
  //     console.log(err);
  //     throw err;
  //   }
  //   console.log("Successfully updated employee role");
  // });

  const name = "Mary Yang";

  const formatName = name.split(' ');
 let first_name = formatName[0];
 let last_name = formatName[1];
 console.log(first_name);
 console.log(last_name);