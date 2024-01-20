const dotenv = require('dotenv');
const result = dotenv.config();

const express = require('express');

const userRoutes = require('./routes/userRouter.js');
const itineraryRoutes1 = require('./routes/itineraryRouter1.js');
const itineraryRoute2 = require('./routes/itineraryRouter2.js');
const destinationRoutes = require('./routes/destinationsRouter.js');
const itineraryRoutes = require('./routes/itineraryRouter.js');

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
app.use('/itinerary', itineraryRoutes1);


// Destinations Routes
app.use('/destination', destinationRoutes);

//Itinerary Routes
app.use('/itinerary', itineraryRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });