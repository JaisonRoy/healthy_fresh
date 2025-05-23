var mysql = require("mysql");
// Initialize pool
var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Connected to Mysql database");
  connection.release();
});

module.exports = pool;
