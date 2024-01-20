const connectToDatabase = require('../database.js');

const connection = connectToDatabase();

// getItineraries endpoint
const getItineraries = (req, res) => {
    const user_id = req.params.user_id;
    
    const query = `
      SELECT 
          it.id AS itinerary_id,
          it.title AS itinerary_title,
          it.budget AS itinerary_budget,
          dest.id AS destination_id,
          dest.name AS destination_name,
          dest.cost AS destination_cost,
          dest.notes AS destination_notes
      FROM 
          itinerary it
      JOIN 
          itinerary_destination it_dest ON it.id = it_dest.itinerary_id
      JOIN 
          destination dest ON it_dest.destination_id = dest.id
      WHERE 
          it.user_id = ?
    `;

    connection.query(query, [user_id], (error, results) => {
        if (error) {
          res.status(500).json({ error: error.message });
          return;
        }
    
        // nest destinations within each itinerary
        const itineraries = {};
        results.forEach(row => {
          if (!itineraries[row.itinerary_id]) {
            itineraries[row.itinerary_id] = {
              itinerary_id: row.itinerary_id,
              title: row.itinerary_title,
              budget: row.itinerary_budget,
              destinations: []
            };
          }
          itineraries[row.itinerary_id].destinations.push({
            id: row.destination_id,
            name: row.destination_name,
            cost: row.destination_cost,
            notes: row.destination_notes
          });
        });
    
        res.json(Object.values(itineraries));
      });
    };
 
module.exports = {
    getItineraries
}