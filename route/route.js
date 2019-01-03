
var jwt    = require('jsonwebtoken');

module.exports = (app,router,Bear,User) => {
router.use(function(req, res,next){
    console.log('Something is happening.');
    next(); 
});

router.get('/', function(req,res){
    res.json({message : 'Yupii! Welcome to my api'});
});

router.route('/bears')
.post(function(req,res){
    var bear = new Bear ();
    bear.name = req.body.name;
   //  //save the bear and check for errors
    bear.save(function(err){
        if(err)
        res.send(err);
        res.json({message : 'Bear created!'});
    });
   })
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
   })
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
   })
   .delete(function(req,res){
       Bear.remove({
           _id: req.params.bear_id
       },function(err,bear){
           if (err)
           res.send(err);
           res.json({message: 'Successfully deleted'});
       });
   });
   router.route('/setup')
   .get(function(req,res){
       //Create a sample user
       var gaby = new User({
           name:'Gabriela',
           password:'123456',
           admin:true
       });       
       //save the sample user
       gaby.save(function(err){
           if (err) throw err;
           console.log('User saved successfully');
           res.json({success:true});
       });
   });
  router.route('/authenticate')
  .post(function(req,res){
      User.findOne({
          name : req.body.name
      }, function(err,user) {

          if (err) throw err;

          if (!user) {

              res.json({success:false,message:'Authentication failed.User not found.'});

          } else if (user){ 
             //check if password matches
             if(user.password !== req.body.password){

                 res.json({success:false ,message:'Athentication failed. Wrong password.'})
                
             } else {
                 
                // if user is found and password is right.
                // create a token with only our given payload.
                // we don't want to pass in the entire user since that has the password.

                const payload ={admin: user.admin};
                var token = jwt.sign(payload, app.get('superSecret'),{
                     expiresIn: 1440 // expires in 24 hours
                 });

                 // return the information including token as JSON
                 res.json({
                     success:true,
                     message:'Enjoy your token!',
                     token:token
                 });
             }
          }
      });
  });
  router.use(function(req,res,next){
      // check header our URL parameters for token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
        
      //decode token

      if (token){
          jwt.verify(token,app.get('superSecret'), function(err,decode) {
              if (err){
                  return res.json({success:false, message:'Failed to authenticate token.'});
              }
              else{
                  req.decode = decode; 
                  next();
              }
          });
      } else{
          return res.status(403).send({success:false, message:'No token provided.'});
      }
  })
  router.route('/users')
     .get(function(req,res){
       User.find({}, function(err,users){
          res.json(users);
       });
   });
   router.route('/users/:user_id')
  .delete(function(req,res){
      User.remove({
          _id:req.params.user_id
      },function(err,user){
          if (err)
          res.send(err);
          res.json({message:'User Successfully deleted'});
      });
  });
};

