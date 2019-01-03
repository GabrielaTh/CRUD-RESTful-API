const express = require("express");
const app = express(); // define our app using express
const bodyParser = require("body-parser");
var router = express.Router();
var morgan = require('morgan');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./models/user'); // get our mongoose model
var mongoose = require('mongoose');
// mongoose.connect(process.env.data_base,{useNewUrlParser:true});
var Bear = require('./models/bear');
//local
// let dbUrl = 'mongodb://127.0.0.1:27017/mydata1';
// mongoose.connect(dbUrl,{useNewUrlParser:true});

// configure app to use bodyParser()
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
require("./route/route")(app,router,Bear,User);

app.use('/api', router);
app.use(morgan('dev'));

// const port = process.env.PORT || 80;
// app.listen(port);
// console.log('start' + port);

//local
const port = 8080; 
app.listen(port);
mongoose.connect(config.database,{useNewUrlParser:true});
app.set('superSecret',config.secret);

