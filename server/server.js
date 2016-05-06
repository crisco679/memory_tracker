var express = require('express');
var mongoose = require('mongoose')
var index = require('./routes/indexRoute')
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var flash = require('connect-flash');
// var Login = require('./routes/loginRoute');
var register = require('./routes/register');
var app = express();


var mongoUri = 'mongodb://localhost/memory_tracker';
var mongoDB = mongoose.connect(mongoUri).connection;
mongoDB.on('error', function(err){
  console.log('MongoDB connection error', err);
});
mongoDB.once('open', function(){
  console.log('MongoDB connection open.');
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// app.configure(function() {
//   app.use(express.cookieParser('secret'));
//   app.use(express.session({ cookie: { maxAge: 60000 }}));
//   app.use(flash());
// });

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 600000, secure: false}
}));
// app.use(flash())

passport.serializeUser(function(user, done){
  console.log('serializing');
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  console.log('deserializing');
  User.findById(id, function(err, user){
    if(err){
      done(err);
    }
    console.log('found user', user);
    done(null, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

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
      });
    });
  }));



//Routes
app.use(express.static('server/public'))
app.use('/', index)
// app.use('/login', Login);
app.use('/register', register);

//Server
var server = app.listen(3000, function(){
  var port = server.address().port
  console.log('Listening on port', port);
})
