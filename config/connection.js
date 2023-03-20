const mysql = require("mysql2");
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
    {
      host: "localhost",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    console.log(`Connected to the cms_db database.`)
  );

  module.exports = db;