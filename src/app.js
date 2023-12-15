const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Josh',
    password: 'TempPassword',
    database: 'project3',
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to the database');
});

