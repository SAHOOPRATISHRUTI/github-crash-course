const mysql = require('mysql');
require("dotenv").config();
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE // Replace with your database name
});

conn.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL:', error);
  } else {
    console.log('Connected to MySQL');
  }
  })

module.exports=conn;