const express = require("express");
const mysql = require("mysql2");
// const db = require("./config/connection");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();


db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to mysql");
});

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Get all employee data
app.get("/api/employees", (req, res) => {
  let sql = `SELECT id, first_name, last_name FROM employees`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log(rows);
    res.status(200).json({ message: "success", data: rows });
  });
});

// Create an employee
// app.post("/api/employees", ({ body }, res) => {
//   const sql = `INSERT INTO employees (first_name) VALUES (?)`;
//   const params = [body.first_name];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.status(200).json({ message: "success", data: body });
//   });
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
