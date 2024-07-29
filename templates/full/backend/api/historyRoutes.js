const express = require('express');
const router = express.Router();

// Route to fetch data from the database
router.get('/history', (req, res) => {
    const query = 'SELECT * FROM history';
    req.db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
