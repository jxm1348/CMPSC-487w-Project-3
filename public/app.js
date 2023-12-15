const express = require('express');
const bodyParser = require('body-parser');
const loginController = require('./loginController');
const tenantController = require('./tenantController');
const managerController = require('./managerController');
const staffController = require('./staffController');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/login', loginController);
app.use('/tenant', tenantController);
app.use('/manager', managerController);
app.use('/staff', staffController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});