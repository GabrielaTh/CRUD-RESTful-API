// call the packages we need
const express = require("express");
const app = express(); // define our app using express
const bodyParser = require("body-parser");


// configure app to use bodyParser()
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

const port = process.env.PORT || 80; 

//ROUTES FOR OUR API
var router = express.Router(); // get an instance of the express Router

//middleware to use for all requests
router.use(function(req, res,next){
    console.log('Something is happening.');
    next(); //make sure we go to the next routes and´don't stop here
});

//test route to make sure everything is working(accessed at GET http://localhost:8080/api)
 router.get('/', function(req,res){
     res.json({message : 'Yupii! Welcome to my api'});
 });

 //on routes that end in /bears
 router.route('/bears')
 //create a bear (access at POST)
 .post(function(req,res){
 var bear = new Bear ();
 bear.name = req.body.name;
//  //save the bear and check for errors
 bear.save(function(err){
     if(err)
     res.send(err);
     res.json({message : 'Bear created!'});
 });
});
router.route('/bears')
.get(function(req, res) {
    Bear.find(function(err, bears) {
        if (err)
            res.send(err);

        res.json(bears);
    });
});

//get all the bears
router.route('/bears/:bear_id')
.get(function(req,res){
    Bear.findById(req.params.bear_id, function(err,bear){
        if (err)
        res.send(err)
        res.json(bear);
    });
});

router.route('/bears/:bear_id')
.put(function(req,res){
    Bear.findById(req.params.bear_id,function(err,bear){
    if(err)
       res.send(err);
       bear.name = req.body.name;
       bear.save(function(err){
           if (err)
             res.send(err);
             res.json({message: 'Bear update'});
       });
    });
});
router.route('/bears/:bear_id')
.delete(function(req,res){
    Bear.remove({
        _id: req.params.bear_id
    },function(err,bear){
        if (err)
        res.send(err);
        res.json({message: 'Successfully deleted'});
    });
});


 //Register our routes
 app.use('/api', router);

 //Start the server
 app.listen(port);
 console.log('Gaby ' + port);

 //Creando base de datos con mongoose
 var mongoose = require('mongoose');

 mongoose.connect(process.env.data_base,{useNewUrlParser:true}); // connect to our database

 //

 var Bear = require('./models/bear');

