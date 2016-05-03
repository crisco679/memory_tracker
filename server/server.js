var express = require('express');
var app = express();
var mongoose = require('mongoose')
var index = require('./routes/indexRoute')
var bodyParser = require('body-parser');
// var memories = require('./routes/memoriesRoute')

app.use(bodyParser.json())
app.use(express.static('server/public'))
app.use('/', index)
// app.use('/memories', memories)

//Database
var mongoUri = 'mongodb://localhost/memory_tracker';
var mongoDB = mongoose.connect(mongoUri).connection;
mongoDB.on('error', function(err){
  console.log('MongoDB connection error', err);
});
mongoDB.once('open', function(){
  console.log('MongoDB connection open.');
});

//Server
var server = app.listen(3000, function(){
  var port = server.address().port
  console.log('Listening on port', port);
})
