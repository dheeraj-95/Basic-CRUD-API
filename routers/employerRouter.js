const express = require('express');
const employerRouter = express.Router();
const { createEmployer, 
    assignEmployee, 
    updateEmployer, 
    getEmployers } = require('../controllers/employerController');

/* API to create Employee */
employerRouter.post('/createEmployer', createEmployer);

/* API to Assign Employee */
employerRouter.post('/assignEmployee', assignEmployee);

/* API to Update Employer */
employerRouter.put('/updateEmployer', updateEmployer);

/* API to get all Employers */
employerRouter.get('/', getEmployers);

module.exports = employerRouter;