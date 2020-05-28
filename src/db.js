// const mysql = require('mysql2/promise');

// const connect = mysql.createPool({
//   host     : process.env.DB_HOST,
//   user     : process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   debug    : true
// })

// module.exports = connect

const mysql = require('mysql2');

const dbPool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  // debug    : true
});

const poolPromise = dbPool.promise();

module.exports = poolPromise;