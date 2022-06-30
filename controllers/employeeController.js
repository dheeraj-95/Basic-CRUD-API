require('dotenv').config()
const { employeeSchema } = require('../schema/employeeSchema');
const MongoClient = require('mongodb').MongoClient;
const logger = require('../logging/logger');
const url = process.env.MONGO_URL;

const createEmployee = async (req,res) => {
    try{
        await employeeSchema.validateAsync(JSON.parse(JSON.stringify(req.body)));
        const client = await MongoClient.connect(url,{ useUnifiedTopology: true });
        let db = client.db("employee-employer")
        let ifExists = await db.collection('employees').findOne({"employeeId" : req.body.employeeId});
        if (ifExists) {
            logger.error('Employee already exists');
            res.status(400).json({status : `Employee already exists. Please provide unique details`});
        }
        else {

            await db.collection('employees').insertOne({
                employeeId : req.body.employeeId,
                employeeName : req.body.employeeName,
                qualification : req.body.qualification,
                employeeEmail : req.body.employeeEmail,
                contactNumber : req.body.contactNumber,
                isEmployerAssigned : false,
                employerName : 'NA'
            });
            logger.info('Employee created successfully');
            res.status(201).json({status : `Employee ${req.body.employeeName} Created Successfully`});
            client.close();
        }
    }catch(err) {
        logger.error('Error Creating Employee');    
        res.status(422).json({status : `${err}`});
    }
    
};

const getEmployees = async (req, res) => {
    try{
        const client = await MongoClient.connect(url, { useUnifiedTopology: true });
        let db = client.db("employee-employer");
        let employees = await db.collection('employees').find().toArray();
        logger.info('Employees fetched successfully');
        res.status(200).json(employees);
        client.close()
    }catch(err){
        logger.error('Error fetching employees from DB');
        res.status(422).json({status : `${err}`});
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const client = await MongoClient.connect(url, { useUnifiedTopology: true });
        let db = client.db("employee-employer");
        const id = parseInt(req.params.id);
        let employees = await db.collection('employees').findOneAndDelete({'employeeId': id}, function(err, result) {
            if(err) {
                logger.error('Unable to delete the employee at the moment');
            } else {
                logger.info('Employee deleted succesfully')
                res.status(200).json({status: result});
            }
        });

    }catch(err) {
        logger.error('Error Deleting employee from DB');
        res.status(422).json({status : `${err}`});
    }
}

module.exports = { createEmployee, getEmployees, deleteEmployee }