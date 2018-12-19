

module.exports = (app,router) => {

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
}

