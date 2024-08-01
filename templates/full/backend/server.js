const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const historyRoutes = require('./api/historyRoutes'); // Import routes
const userRoutes = require('./api/user');
const userUpdate = require('./api/updateRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ijse@1234',
    database: 'bandwidthSystem', // replace with your actual database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

// Middleware to add database to request
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Use the routes from historyRoutes.js
app.use('/api', historyRoutes);
app.use('/api', userRoutes);
app.use('/api', userUpdate);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
