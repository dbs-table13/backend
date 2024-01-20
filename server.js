const dotenv = require('dotenv');
const result = dotenv.config();

const express = require('express');

const userRoutes = require('./routes/userRouter.js');
const itineraryRoute2 = require('./routes/itineraryRouter2.js');
const itineraryRoute3 = require('./routes/itineraryRouter3.js');

const app = express();
const port = 3001;

const cors = require('cors');
app.use(cors());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

const mysql = require('mysql2');
// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });

// Claims Routes
app.use('/itinerary', itineraryRoute2);
app.use('/users', userRoutes);
app.use('/itinerary', itineraryRoute3)

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });