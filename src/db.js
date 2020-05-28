const mysql = require('mysql2');

const dbPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,

  // debug    : true
});

const poolPromise = dbPool.promise();

module.exports = poolPromise;