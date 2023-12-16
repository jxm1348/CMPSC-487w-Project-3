const express = require('express');
const router = express.Router();

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check credentials (replace this with your actual authentication logic)
    if (username === 'your_username' && password === 'your_password') {
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

module.exports = router;