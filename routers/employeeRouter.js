const express = require('express');
const employeeRouter = express.Router();
const { createEmployee, getEmployees } = require('../controllers/employeeController');

/* API to create Employee */
employeeRouter.post('/createEmployee', createEmployee);

/* API to get Employees */
employeeRouter.get('/', getEmployees )

module.exports = employeeRouter;