const connectToDatabase = require('../database.js');

const connection = connectToDatabase();

//editDestination endpoint
const editDestination = (req, res) => {
    const id = req.params.id

    const { cost, name, notes } = req.body;

    const updateQuery = `
        UPDATE destination 
        SET cost = ?, name = ?, notes = ?
        WHERE id = ?
    `;

    connection.query(updateQuery, [cost, name, notes, id], (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message});
            return;
        }
        res.status(200).json({ message: 'Destination updated successfully'})
    });
}

const deleteDestination = (req, res) => {
    const id = req.params.id;
    const deleteItineraryDestinationQuery = `
    DELETE FROM itinerary_destination 
    WHERE destination_id = ?
    `;

    connection.query(deleteItineraryDestinationQuery, [id]);

    const deleteDestinationQuery = `
    DELETE FROM destination
    WHERE id = ?
    `;

    connection.query(deleteDestinationQuery, [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.status(200).json({ message: 'Destination deleted successfully'});
    })
}

module.exports = {
    editDestination,
    deleteDestination
};