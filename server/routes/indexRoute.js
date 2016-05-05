var router = require('express').Router();
var path = require('path');
var model = require('../models/model.js');
var mongoose = require('mongoose');
var passport = require('passport');

// router.get('/', function(request, response, next){
//   response.sendFile(path.join(__dirname, '../public/views/login.html'));
// });

router.post('/',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/'
  })
);


router.post('/store', function(request, response){
  var Memory = new model({
    memoryName: request.body.memoryName,
    memoryDescription: request.body.memoryDescription
  });
  console.log('Memory variable', Memory);
  Memory.save()
});
router.get('/memories', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/memories.html'))
})
router.get('/memories/data', function(request, response){
    model.find({}).exec(function(err, memories){
    if(err){
      console.log('Error', err);
    }
    response.send(JSON.stringify(memories));
  })
})
router.get('/home', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/home.html'))
})
router.delete('/memories/data/:id', function(request, response){
  console.log('Deleting requested profile id', request.params.id);
  model.findOneAndRemove({_id: request.params.id}, function(err, memory){
    if(err){
      console.log("Error removing profile from database w/ error", err);
      response.status(500).send(err);
    } else {
      console.log("profile deleted", memory)
      response.sendStatus(200);
    }
  });
})

router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/index.html'))
})


router.post('/',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/'
  })
);
router.get('/*', function(request, response, next){
	if(request.isAuthenticated()){
		next() //User is logged in, carry on.
	} else {
		response.redirect('/login') //Not logged in, send back.
	}
});


module.exports = router;
