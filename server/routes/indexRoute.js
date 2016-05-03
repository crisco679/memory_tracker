var router = require('express').Router();
var path = require('path');
var model = require('../models/model.js');
var mongoose = require('mongoose');






router.post('/store', function(request, response){
  var Memory = new model({
    memoryName: request.body.memoryName,
    memoryDescription: request.body.memoryDescription
  });
  console.log('Memory variable', Memory);
  Memory.save()
});
  router.get('/memories', function(request, response){
    return model.find({}).exec(function(err, memories){
      if(err){
        console.log('Error', err);
      }
      response.send(JSON.stringify(memories));
    })
  })


router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/index.html'))
})


module.exports = router;
