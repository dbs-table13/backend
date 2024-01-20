const connectToDatabase = require('../database.js');

const connection = connectToDatabase();

//editDestination endpoint
const editDestination = (req, res) => {
    const { id, country_id, cost, name, notes } = req.body;

    const updateQuery = `
        UPDATE destination 
        SET country_id = ?, cost = ?, name = ?, notes = ?
        WHERE id = ?
    `;

    connection.query(updateQuery, [country_id, cost, name, notes, id], (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message});
            return;
        }
        res.status(200).json({ message: 'Destination updated successfully'})
    });
}

//deleteDestination endpoint
// const deleteDestination = (req, res) => {
//     const itineraryId = req.params.itineraryId;
//     const destinationId = req.params.destinationId;
//     const deleteQuery = `
//         DELETE FROM itinerary_destination 
//         WHERE itinerary_id = ? 
//         AND destination_id = ?
//     `;
    
//     connection.query(deleteQuery, [itineraryId, destinationId], (error, results) => {
//         if (error) {
//             res.status(500).json({ error: error.message });
//             return
//         }
//         res.status(200).json({ message: 'Destination deleted successfully'})
//     });
// }
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