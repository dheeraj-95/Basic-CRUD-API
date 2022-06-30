const express = require('express');
const employeeRouter = express.Router();
const { createEmployee, getEmployees, deleteEmployee } = require('../controllers/employeeController');

/* API to create Employee */
employeeRouter.post('/createEmployee', createEmployee);

/* API to get Employees */
employeeRouter.get('/', getEmployees );

/* API to delete Employee */
employeeRouter.delete('/:id', deleteEmployee);

module.exports = employeeRouter;