const dotenv = require('dotenv');
const result = dotenv.config();

const express = require('express');
const claimRoutes = require('./routes/claimsRouter.js');
const userRoutes = require('./routes/userRouter.js');
const itineraryRoutes = require('./routes/itineraryRouter3.js');
const itineraryRoutes1 = require('./routes/itineraryRouter1.js');
const userRoutes = require('./routes/userRoutes.js');

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
app.use('/claims', claimRoutes);
app.use('/users', userRoutes);
app.use('/itinerary', itineraryRoutes)
app.use('/users', userRoutes);
app.use('/itinerary', itineraryRoutes1);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });