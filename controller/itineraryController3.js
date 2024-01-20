const connectToDatabase = require('../database.js');

const connection = connectToDatabase().promise(); // Use .promise() to enable the promise wrapper

const deleteItinerary = async (req, res) => {
  const itineraryId = req.params.id;

  // Check if the user has the necessary permissions to delete the itinerary
  try {
    // Delete all related rows in itinerary_destination first
    const deleteDestinationQuery = 'DELETE FROM itinerary_destination WHERE itinerary_id = ?';
    await connection.query(deleteDestinationQuery, [itineraryId]);

    // Now delete the itinerary
    const deleteItineraryQuery = 'DELETE FROM itinerary WHERE id = ?';
    await connection.query(deleteItineraryQuery, [itineraryId]);

    res.status(200).json({ message: 'Itinerary deleted successfully' });
  } catch (error) {
    console.error('Error deleting itinerary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Close the connection after the queries are executed
    connection.end();
  }
};

module.exports = {
  deleteItinerary
};
