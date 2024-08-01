// user.js
const express = require('express');
const router = express.Router();

// Route to get user details by ID
router.get('/user/:id', (req, res) => {
    console.log('Received request for user ID:', req.params.id); // Debugging
    const userId = req.params.id;

    const query = 'SELECT * FROM User_account WHERE id = ?';

    req.db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user details:', err);
            res.status(500).send('Error fetching user details');
            return;
        }

        console.log('Query results:', results); // Debugging

        if (results.length === 0) {
            res.status(404).send('User not found');
            return;
        }

        res.json(results[0]);
    });
});

router.put('/update-password', (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    req.db.query('SELECT password FROM User_account WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err); // Log the error
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];

        if (user.password !== currentPassword) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        req.db.query('UPDATE User_account SET password = ? WHERE id = ?', [newPassword, userId], (err, results) => {
            if (err) {
                console.error('Error updating password:', err); // Log the error
                return res.status(500).json({ message: 'Database error' });
            }

            res.status(200).json({ message: 'Password updated successfully' });
        });
    });
});





module.exports = router;
