const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Josh',
    password: 'TempPassword',
    database: 'project3',
});

// Function to generate a random ID
function generateRandomId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `${timestamp}_${random}`;
}

// Add or Update Tenant
router.post('/addOrUpdateTenant', (req, res) => {
    const { tenantName, phoneNumber, email, checkInDate, checkOutDate, apartmentNumber } = req.body;

    // Check if a tenant with the same name already exists
    const checkExistenceSql = 'SELECT * FROM tenants WHERE name = ?';
    db.query(checkExistenceSql, [tenantName], (checkExistenceErr, checkExistenceResult) => {
        if (checkExistenceErr) {
            console.error(checkExistenceErr);
            res.status(500).send('Error checking tenant existence');
            return;
        }

        if (checkExistenceResult.length > 0) {
            // Tenant with the same name already exists, update the existing tenant
            const existingTenantId = checkExistenceResult[0].tenantid;
            const updateSql = 'UPDATE tenants SET phone = ?, email = ?, datein = ?, dateout = ?, apartment = ? WHERE tenantid = ?';
            db.query(updateSql, [phoneNumber, email, checkInDate, checkOutDate, apartmentNumber, existingTenantId], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error(updateErr);
                    res.status(500).send('Error updating existing tenant');
                } else {
                    console.log('Existing tenant updated successfully');
                    res.status(200).send('Existing tenant updated successfully');
                }
            });
        } else {
            // Tenant doesn't exist, add a new tenant with a generated ID
            const newTenantId = generateRandomId();
            const addSql = 'INSERT INTO tenants (tenantid, name, phone, email, datein, dateout, apartment) VALUES (?, ?, ?, ?, ?, ?, ?)';
            db.query(addSql, [newTenantId, tenantName, phoneNumber, email, checkInDate, checkOutDate, apartmentNumber], (addErr, addResult) => {
                if (addErr) {
                    console.error(addErr);
                    res.status(500).send('Error adding new tenant');
                } else {
                    console.log('New tenant added successfully');
                    res.status(200).send('New tenant added successfully');
                }
            });
        }
    });
});

// Move Tenant
router.post('/moveTenant', (req, res) => {
    const { tenantID, newApartment } = req.body;

    // Assuming you have a "tenants" table with a "tenantid" column
    const sql = 'UPDATE tenants SET apartment = ? WHERE tenantid = ?';
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

    // Assuming you have a "tenants" table with a "tenantid" column
    const sql = 'DELETE FROM tenants WHERE tenantid = ?';
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

function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });

    document.getElementById(tabName).style.display = 'block';
}


function addOrUpdateTenant() {
    const tenantName = document.getElementById('tenantName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const checkInDate = document.getElementById('checkInDate').value;
    const checkOutDate = document.getElementById('checkOutDate').value;
    const apartmentNumber = document.getElementById('apartmentNumber').value;

    // You may want to perform additional validation here

    // Send a POST request to your server with the tenant data
    fetch('/addOrUpdateTenant', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tenantName,
            phoneNumber,
            email,
            checkInDate,
            checkOutDate,
            apartmentNumber,
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log(data); // Log the server response
            // You can perform additional actions based on the server response
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

module.exports = router;