const express = require('express');
const router = express.Router();

router.put('/update/:id', (req, res) => {
    const userId = req.params.id;
    const { Email, name, contact, userName } = req.body;



    const sql = `
        UPDATE User_account
        SET Email = ?, name = ?, contact = ?, userName = ?
        WHERE id = ?
    `;

    req.db.query(sql, [Email, name, contact, userName, userId], function (err, results) {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).send('An error occurred while updating the user.');
        }

        res.send('User updated successfully.');
    });
});


module.exports = router;
