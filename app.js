const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(cors());

const PORT = 3300;

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',  // XAMPP uses localhost
    user: 'root',       // Default user in XAMPP MySQL
    password: '',       // Leave empty if no password is set
    database: 'restaurant' // Replace with your actual database name
});
 
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the XAMPP MySQL database');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
///////////////////////////////////////////////////

// Routes

app.post('/admin-login', (req, res) => {
  const { Email, PasswordHash } = req.body;
  
  const query = 'SELECT AdminID, Username, Email, FullName, CreatedAt FROM adminusers WHERE Email = ? AND PasswordHash = ?';
  const values = [Email, btoa(PasswordHash)];
  db.query(query, values, (err, results) => {
      if (err) {
          console.error('Error fetching data:', err);
          return res.status(500).json({ message: 'Error with supplied details!', error: err });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'Error with supplied details!' });
      }
      res.status(200).json({ success: true, data: results[0] });
  });
});

// Create a new restaurant profile
app.post('/restaurant-profile', (req, res) => {
    const { Name, Address, PhoneNumber, Email, Description, } = req.body;
    const query = 'INSERT INTO RestaurantProfile (Name, Address, PhoneNumber, Email, Description) VALUES (?, ?, ?, ?, ?)';
    const values = [Name, Address, PhoneNumber, Email, Description];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Failed to create restaurant profile!', error: err });
        }
        res.status(201).json({ success: true, message: 'Restaurant profile created successfully!', id: result.insertId });
    });
});

// Retrieve all restaurant profiles
app.get('/restaurant-profile', (req, res) => {
    const query = 'SELECT * FROM RestaurantProfile';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: 'Error fetching restaurant profiles!', error: err });
        }
        res.status(200).json({ success: true, data: results, labels: ['Name', 'Address', 'PhoneNumber', 'Email', 'Description'] });
    });
});

// Retrieve a specific restaurant profile by ID
app.get('/restaurant-profile/:id', (req, res) => {
    const query = 'SELECT * FROM RestaurantProfile WHERE RestaurantID = ?';

    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: 'Error fetching restaurant profile!', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Restaurant profile not found!' });
        }
        res.status(200).json({ success: true, data: results[0] });
    });
});

// Update a restaurant profile by ID
app.put('/restaurant-profile/:id', (req, res) => {
    const { Name, Address, PhoneNumber, Email, Description,} = req.body;
    const query = 'UPDATE RestaurantProfile SET Name = ?, Address = ?, PhoneNumber = ?, Email = ?, Description = ? WHERE RestaurantID = ?';
    const values = [Name, Address, PhoneNumber, Email, Description, req.params.id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).json({ message: 'Error updating restaurant profile!', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Restaurant profile not found!' });
        }
        res.status(200).json({ success: true, message: 'Restaurant profile updated successfully!' });
    });
});

// Delete a restaurant profile by ID
app.delete('/restaurant-profile/:id', (req, res) => {
    const query = 'DELETE FROM RestaurantProfile WHERE RestaurantID = ?';

    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).json({ message: 'Error deleting restaurant profile!', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Restaurant profile not found!' });
        }
        res.status(200).json({ success: true, message: 'Restaurant profile deleted successfully!' });
    });
});


const router = express.Router(); 

// GET: Retrieve all profile updates
router.get('/updates', (req, res) => {
  const query = 'SELECT * FROM ProfileUpdates';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching profile updates', error: err });
    }
    res.status(200).json({ success: true, data: results });
  });
});

// POST: Create a new profile update
router.post('/updates', (req, res) => {
  const { UserID, AdminID, FieldUpdated, OldValue, NewValue } = req.body;
  const query = 'INSERT INTO ProfileUpdates (UserID, AdminID, FieldUpdated, OldValue, NewValue) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [UserID, AdminID, FieldUpdated, OldValue, NewValue], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating profile update', error: err });
    }
    res.status(201).json({ success: true, message: 'Profile update created successfully', UpdateID: result.insertId });
  });
});

// PUT: Update an existing profile update
router.put('/updates:id', (req, res) => {
  const { id } = req.params;
  const { UserID, AdminID, FieldUpdated, OldValue, NewValue } = req.body;
  const query = 'UPDATE ProfileUpdates SET UserID = ?, AdminID = ?, FieldUpdated = ?, OldValue = ?, NewValue = ?, UpdatedAt = CURRENT_TIMESTAMP WHERE UpdateID = ?';

  db.query(query, [UserID, AdminID, FieldUpdated, OldValue, NewValue, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating profile update', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Profile update not found' });
    }
    res.status(200).json({ success: true, message: 'Profile update updated successfully' });
  });
});

// DELETE: Delete a profile update
router.delete('/updates:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM ProfileUpdates WHERE UpdateID = ?';

  db.query(query, [id], (err, result) => {
    if (err) {const router = express.Router(); // Use this if you are building modular routes.

      return res.status(500).json({ message: 'Error deleting profile update', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Profile update not found' });
    }
    res.status(200).json({ success: true, message: 'Profile update deleted successfully' });
  });
});

module.exports = router;


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




