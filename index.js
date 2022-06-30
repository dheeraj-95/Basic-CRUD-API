const express = require('express'); // It is a minimal and flexible Node.js web application framework.
const app = express(); 
const cors = require('cors'); // cors for resource sharing
const bodyParser = require('body-parser'); // It is responsible for parsing the incoming request bodies.
const errorMiddleware = require('./middlewares/errorMiddleware');
const employeeRouter = require('./routers/employeeRouter');
const employerRouter = require('./routers/employerRouter');

const port = process.env.PORT || 8080;
app
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended : true}))
    .get('/',(req,res) => {
        res.json({status :"Hello From Backend"})
    })
    .use('/employee',employeeRouter)
    .use('/employer',employerRouter)
    .use(errorMiddleware)
    .listen(port)