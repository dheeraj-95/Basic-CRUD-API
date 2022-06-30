require('dotenv').config()
const express = require('express');
const employeeRouter = express.Router();
const { employeeSchema } = require('../schema/employeeSchema');
const MongoClient = require('mongodb').MongoClient;
const logger = require('../logging/logger');
const url = process.env.MONGO_URL;

/* API to create Employee */
employeeRouter
    .post('/createEmployee', async (req,res) => {
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
        
    })
    .get('/', async (req, res) => {
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
    })

module.exports = employeeRouter;