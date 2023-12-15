const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Josh',
    password: 'TempPassword',
    database: 'project3',
});

// Add Tenant
router.post('/addTenant', (req, res) => {
    const { tenantName, phoneNumber, email, checkInDate, checkOutDate, apartmentNumber } = req.body;

    // Assuming you have a "tenants" table with appropriate columns
    const sql = 'INSERT INTO tenants (tenantName, phoneNumber, email, checkInDate, checkOutDate, apartmentNumber) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [tenantName, phoneNumber, email, checkInDate, checkOutDate, apartmentNumber], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding tenant');
        } else {
            console.log('Tenant added successfully');
            res.status(200).send('Tenant added successfully');
        }
    });
});

// Move Tenant
router.post('/moveTenant', (req, res) => {
    const { tenantID, newApartment } = req.body;

    // Assuming you have a "tenants" table with an "id" column for tenantID
    const sql = 'UPDATE tenants SET apartmentNumber = ? WHERE id = ?';
    db.query(sql, [newApartment, tenantID], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error moving tenant');
        } else {
            console.log('Tenant moved successfully');
            res.status(200).send('Tenant moved successfully');
        }
    });
});

// Delete Tenant
router.post('/deleteTenant', (req, res) => {
    const { tenantID } = req.body;

    // Assuming you have a "tenants" table with an "id" column for tenantID
    const sql = 'DELETE FROM tenants WHERE id = ?';
    db.query(sql, [tenantID], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting tenant');
        } else {
            console.log('Tenant deleted successfully');
            res.status(200).send('Tenant deleted successfully');
        }
    });
});

module.exports = router;