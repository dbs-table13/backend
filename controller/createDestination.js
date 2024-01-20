const connectToDatabase = require('../database.js');
const connection = connectToDatabase();

// createDestination endpoint
// body should have country_id, cost, name, notes

const createDestination = (req, res) => {
    const { country_id, cost, name, notes } = req.body;
  
    const insertQuery = `
      INSERT INTO destination (country_id, cost, name, notes) 
      VALUES (?, ?, ?, ?)
    `;
  
    connection.query(insertQuery, [country_id, cost, name, notes], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
      res.status(201).json({ message: 'Destination created successfully', destinationId: results.insertId });
    });
  
}

module.exports = {
    createDestination
}