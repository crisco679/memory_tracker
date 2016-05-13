var router = require('express').Router();
var path = require('path');
var model = require('../models/model.js');
var mongoose = require('mongoose');
var passport = require('passport');
var moment = require('moment');

router.get('/logout', function(request, response){
  console.log('Logging out!!!!');
  request.logout();
  response.redirect('/');
});
router.post('/store', function(request, response){
  var Memory = new model({
    userId: request.user.id,
    memoryName: request.body.memoryName,
    memoryDescription: request.body.memoryDescription,
    dateCreated: request.body.dateCreated
  })
  Memory.dateCreatedString  = moment(Memory.dateCreated).zone(2).format('LLLL')
  console.log('Memory variable', Memory);
  Memory.save();
})
router.get('/memories/data', function(request, response){
  model.find({userId : request.user.id}).exec(function(err, memories){
    if(err){
      console.log('Error', err);
    }
    response.send(JSON.stringify(memories));
  })
});
router.get('/memories/count', function(request, response){
  model.count({userId : request.user.id}).exec(function(err, memories){
    if(err){
      console.log('Error', err);
    } else {
      response.send(JSON.stringify(memories));
    }
  })
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
});
router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/index.html'))
});
router.post('/',
passport.authenticate('local', {
  successRedirect: '/loginSecure/home',
  failureRedirect: '/',
})
);

module.exports = router;
