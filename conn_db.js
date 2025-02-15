// Databse variables
require('dotenv').config()
const Pool = require('pg').Pool;

// Database instance
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATA,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

module.exports = {
    pool,
};