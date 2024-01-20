const { connectToDatabase, pool } = require('../database.js');

const connection = connectToDatabase();

// createItinerary endpoint
const createItinerary = (req, res) => {
  const { title, budget, countryid, destinations } = req.body;
  // have to take userid from the session
  const userid = '1';
  const insertQuery = `
    INSERT INTO itinerary 
    ( title, budget, country_id, user_id )
    VALUES 
    (?, ?, ?, ?)
  `;
  connection.query(insertQuery, [title, budget, countryid, userid], (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(201).json({ message: 'Itinerary created', itineraryId: results.insertId });
    createDestinations(destinations, countryid, results.insertId);
  });
}

function createDestinations(destinations, countryid, itineraryId) {
  for (destination of destinations) {
    const { cost, name, notes } = destination;
    const insertQuery2 = `
      INSERT INTO destination 
      ( cost, name, notes, country_id )
      VALUES 
      (?, ?, ?, ?)
    `;
    let destinationId;
    connection.query(insertQuery2, [cost, name, notes, countryid], (error, results, fields) => {
      if (error) {
        throw error;
        return;
      }
      // console.log(results);
      destinationId = results.insertId;
      createRelationship(itineraryId, destinationId);
    });
  }
}
function createRelationship(itineraryId, destinationId) {
  const insertQuery3 = `
      INSERT INTO itinerary_destination 
      ( itineray_id, destination_id )
      VALUES 
      (?, ?)
    `;
  connection.query(insertQuery3, [itineraryId, destinationId], (error, results, fields) => {
    if (error) {
      throw error;
      return;
    }
    console.log(results);
  });
}

module.exports = {
  createItinerary
};