// Databse variables
const Pool = require('pg').Pool;

// Database instance
const pool = new Pool({
  user: 'postgres',
  host: 'containers-us-west-96.railway.app',
  database: 'railway',
  password: 'z2Mp6PcfjqV3fWZFPEZy',
  port: 7242,
});

module.exports = {
    pool,
};