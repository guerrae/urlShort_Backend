// Databse variables
const Pool = require('pg').Pool;

// Database instance
const pool = new Pool({
  user: 'postgres',
  host: 'containers-us-west-96.railway.app',
  database: 'railway',
  password: 'R3MgFUIfAKyJDLHI59tM',
  port: 7242,
});

module.exports = {
    pool,
};