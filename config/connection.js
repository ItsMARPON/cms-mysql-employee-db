const mysql = require("mysql2");
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "babyshark",
      database: "cms_db",
    },
    console.log(`Connected to the cms_db database.`)
  );

  module.exports = db;