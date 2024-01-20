const connectToDatabase = require('../database.js');

const connection = connectToDatabase();

const editItinerary = (req, res) => {
    const id = req.params.id
    const { budget, title } = req.body;

    const updateItinerary = `
        UPDATE itinerary 
        SET budget = ?, title = ?
        WHERE id = ?
    `;

    connection.query(updateItinerary, [budget, title, id], (error) => {
        if (error) {
            res.status(500).json({ error: error.message});
            return;
        }
        res.status(200).json({ message: 'Destination updated successfully'})
    });
}

module.exports = {
    editItinerary
};