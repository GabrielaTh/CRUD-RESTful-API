const express = require("express");
const app = express(); // define our app using express
const bodyParser = require("body-parser");
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect(process.env.data_base,{useNewUrlParser:true});
var Bear = require('./models/bear');
//local
// let dbUrl = 'mongodb://127.0.0.1:27017/mydata1';
// mongoose.connect(dbUrl,{useNewUrlParser:true});

// configure app to use bodyParser()
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
require("./route/route")(app,router);
app.use('/api', router);
app.listen(port);

const port = process.env.PORT || 80;

//local
// const port = 8080; 
// app.listen(port);

