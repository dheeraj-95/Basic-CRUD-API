const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/authMiddleware');
const userRouter = require('./routers/userRouter');

const port = process.env.PORT || 8080;
app
    .use(cors())
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended : true}))
    .get('/',(req,res) => {
        res.json({status :"Hello From Backend"})
    })
    .use('/user',userRouter)
    .use(errorMiddleware)
    .listen(port)