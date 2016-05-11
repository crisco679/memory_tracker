var express = require('express');
var mongoose = require('mongoose');
var index = require('./routes/indexRoute')
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;
var User = require('./models/user')
var register = require('./routes/register')
var loginSecure = require('./routes/loginSecure')
var app = express()
//Database
var mongoUri = 'mongodb://localhost/memory_tracker';
var mongoDB = mongoose.connect(mongoUri).connection;
mongoDB.on('error', function(err){
  console.log('MongoDB connection error', err);
});
mongoDB.once('open', function(){
  console.log('MongoDB connection open.');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 6000000, secure: false}
}))
passport.serializeUser(function(user, done){
  done(null, user.id);
})
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if(err){
      done(err)
    } else{
      done(null, user);
    }
  })
})

app.use(passport.initialize())
app.use(passport.session())

passport.use('local', new localStrategy({
  passReqToCallback : true,
  usernameField: 'username'
},
function(req, username, password, done) {
  User.findOne({ username: username}, function(err, user){
    if(err){
      console.log(err);
    }
    if(!user){
      return done(null, false, {message: 'Incorrect username and password.'});
    }

    //test a matching password
    user.comparePassword(password, function(err, isMatch){
      if(err){
        console.log(err)
      }
      if(isMatch){
        return done(null, user);
      }else {
        done(null, false, {message: 'Incorrect username and password.'});
      }
    })
  });
}));
//Routes
app.use(express.static('server/public'));
app.use('/', index);
app.use('/register', register);
app.use('/loginSecure', function(request, response, next){
  if(request.isAuthenticated()){
    next() //User is logged in, carry on.
  } else {
    response.redirect('/') //Not logged in, send back.
  }})
  app.use('/loginSecure', loginSecure);

  //Server
  var server = app.listen(3000, function(){
    var port = server.address().port
    console.log('Listening on port', port);
  })
