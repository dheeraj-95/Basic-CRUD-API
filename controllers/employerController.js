require('dotenv').config()
const { employerSchema } = require('../schema/employerSchema');
const MongoClient = require('mongodb').MongoClient;
const logger = require('../logging/logger');
const url = process.env.MONGO_URL;

const createEmployer = async (req,res) => {
    try{
        await employerSchema.validateAsync(JSON.parse(JSON.stringify(req.body)));
        const client = await MongoClient.connect(url,{ useUnifiedTopology: true });
        let db = client.db("employee-employer")
        let ifExists = await db.collection('employers').findOne({"employerId" : req.body.employerId});
        if(ifExists){
            logger.error('Employer already exists');
            res.status(400).json({status :`Employer with ${req.body.employerId} already exists. Please provide a unique Id`});
        }else {
            await db.collection('employers').insertOne({
                employerId : req.body.employerId,
                employerName : req.body.employerName,
                employerEmail : req.body.employerEmail,
                contactNumber : req.body.contactNumber,
                employees : []
            });
            logger.info('Employer created successfully');
            res.status(201).json({status : `Employer ${req.body.employerName} Created Successfully`});
            client.close()
        }
    }catch(err) {
        logger.error('Error Creating Employer');  
        res.status(422).json({status : `${err}`});
        console.log(err);
    }
};

const assignEmployee = async (req, res) => {
    try{
        const client = await MongoClient.connect(url,{ useUnifiedTopology: true });
        let db = client.db("employee-employer")
        let find = await db.collection('employers').findOne( {employees : req.body.employeeName})
        if(!find){
            await db.collection('employers').findOneAndUpdate({employerId : req.body.employerId}, {$push : {employees : req.body.employeeId}})
            await db.collection('employees').findOneAndUpdate({employeeId : req.body.employeeId}, {$set : {isEmployerAssigned : true, employerId : req.body.employerId, employerName: req.body.employerName}})
            // await db.collection('employees').findOneAndUpdate({employeeId : req.body.employeeId}, {$set : {employerId : req.body.employerId}})
            logger.info('Employee Details Updated Successfully');
            res.status(200).json({status: 'Details updated successfully'});
        }else {
            logger.error('Employee already assigned with a employer');
            res.status(422).json({status : `${req.body.employeeName} already assigned with a employer`});
        }
        client.close()
    }catch(err) {
        logger.error('Cannot assign employee');
        res.status(422).json({status : `${err}`});
        console.log(err);
    }
};

const updateEmployer = async (req, res) => {
    try{
        const client = await MongoClient.connect(url,{ useUnifiedTopology: true });
        let db = client.db("employee-employer")
        let oldEmployerFind = await db.collection('employers').findOne( {employerName : req.body.oldEmployerName})
        let newEmployerFind = await db.collection('employers').findOne( {employerName : req.body.newEmployerName})
        if(oldEmployerFind && newEmployerFind) {

            await db.collection('employers').findOneAndUpdate({employerName : req.body.oldEmployerName},{$pull : {employees : req.body.employeeName}})
            await db.collection('employers').findOneAndUpdate({employerName : req.body.newEmployerName},{$push : {employees : req.body.employeeName}})
            await db.collection('employees').findOneAndUpdate({employeeName : req.body.employeeName}, {$set : {isEmployerAssigned : true, employerName : req.body.newEmployerName}})
            // await db.collection('employees').findOneAndUpdate({employeeName : req.body.employeeName}, {$set : {employerName : req.body.newEmployerName}})
            logger.info('Employer Changed successfully');
            res.status(200).json({status : 'Employer Changed successfully'});
            
        }else {
            logger.error('Employer name is not registered, Please check the Employer name');
            res.status(400).json({status : 'Employer name is not registered, Please check the Employer name'});
        }

        client.close()
    }catch(err){
        logger.error('Updating Employer failed');
        res.status(422).json({status : `${err}`});
    }
};

const getEmployers = async (req,res) => {
    try{
        const client = await MongoClient.connect(url,{ useUnifiedTopology: true });
        let db = client.db("employee-employer");
        let employers = await db.collection('employers').find().toArray();
        logger.info('Fetched employers from DB.');
        res.status(200).json(employers);
        client.close()
    }catch(err){
        logger.error('Unable to fetch employers.');
        res.status(422).json({status : `${err}`});
        console.log(err);
    }
};

module.exports = { createEmployer, assignEmployee, updateEmployer, getEmployers}