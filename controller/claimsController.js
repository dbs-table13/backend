const connectToDatabase = require('../database.js');

const connection = connectToDatabase();

// getAllClaims endpoint
const getAllClaims = (req, res) => {
  connection.query("SELECT * FROM insuranceClaims", (error, results, fields) => {
    if (error) throw error; // return json with the error
    
    // Convert BIT fields to boolean
    const modifiedResults = results.map(row => ({
      ...row, // spread operator, copies all properties from row
      FollowUp: row.FollowUp[0] === 1 // FollowUp is a BIT(1), converts 0/1 into true/false
    }));

    res.json(modifiedResults);
  });
}

// getClaimById endpoint
const getClaimById = (req, res) => {
  const id = req.params.id;
  connection.query("SELECT * FROM insuranceClaims WHERE ClaimID = ?", [id], (error, results, fields) => {
    if (error) throw error; // return json with the error
    res.json(results);
  });
}

// createClaim endpoint
const createClaim = (req, res) => {
  const { InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID, Status, LastEditedClaimDate } = req.body;

  // ` ` is a template literal, allows you to insert variables into a string
  // also allows for multu line strings
  const insertQuery = `
    INSERT INTO InsuranceClaims 
    (InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID, Status, LastEditedClaimDate)
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(insertQuery, [InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimID, Status, LastEditedClaimDate], (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(201).json({ message: 'Claim created', claimId: results.insertId });
    console.log(results);
  });
}

module.exports = {
  getAllClaims,
  getClaimById,
  createClaim
};