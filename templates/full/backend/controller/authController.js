const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/Db.js');



exports.signUp = async (req, res) => {
    console.log("in 1");
    const { name, email, password } = req.body;

    console.log("DB Object:", db); // Add this line to debug

    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, message: 'Database error occurred' });
        }

        if (results.length > 0) {
            return res.json({ success: false, message: 'Email already exists' });
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error(err);
                return res.json({ success: false, message: 'Error hashing password' });
            }

            const insertUserQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            db.query(insertUserQuery, [name, email, hash], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.json({ success: false, message: 'Database error occurred' });
                }
                res.json({ success: true });
            });
        });
    });
}

exports.signIn = (req, res) => {
    const { email, password } = req.body;

    const findUserQuery = 'SELECT * FROM users WHERE Email = ?';
    db.query(findUserQuery, [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, message: 'Database error occurred' });
        }

        if (results.length === 0) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare passwords
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error(err);
                return res.json({ success: false, message: 'Error during password comparison' });
            }

            if (isMatch) {
                res.json({ success: true });
            } else {
                res.json({ success: false, message: 'Invalid email or password' });
            }
        });
    });
};

