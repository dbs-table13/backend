const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

const connectToDatabase = () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

  connection.connect(error => {
    if (error) {
      console.error("Error connecting to the database:", error);
      return null;
    }
    console.log("Successfully connected to the database.");
    return connection;
  });

  return connection;
};

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}).promise();

module.exports = { connectToDatabase, pool };
