const express=require('express')
const router = require('./src/Routes/api');
const app =new express(); 

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit=require('express-rate-limit');
const helmet=require('helmet');
const mongoSanitize=require('express-mongo-sanitize');
const xss=require('xss-clean');
const hpp=require('hpp');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const path=require('path');

app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb'}));
app.use(bodyParser.json());

const limiter=rateLimit({windowMs:15*60*1000,max:300});
app.use(limiter);

mongoose.connect('mongodb://localhost:27017/SalesCollection', { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

// mongoose.connect('mongodb://localhost:27017/SalesCollection', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log('MongoDB connection established successfully');
// });


app.use("/api/v1", router);

module.exports=app;