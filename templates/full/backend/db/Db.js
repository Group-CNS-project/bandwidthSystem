const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ijse@1234',
    database: 'bandwidthSystem'
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to the MySQL server.');
    }
});

module.exports = connection;
