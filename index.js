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