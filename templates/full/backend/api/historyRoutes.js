const express = require('express');
const router = express.Router();


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


router.get('/daily-data-usage', (req, res) => {
    const query = `
        SELECT
            date_use,
            SUM(total_download) AS total_download,
            SUM(total_upload) AS total_upload,
            SUM(total) AS total
        FROM
            history
        GROUP BY
            date_use
        ORDER BY
            date_use
    `;
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
