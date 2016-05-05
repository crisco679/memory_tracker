var router = require('express').Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');



router.get('/', function(request, response, next){
  response.sendFile(path.join(__dirname, '../public/views/register.html'));
});

router.post('/', function(request, response, next){
  Users.create(request.body, function(err, post){
    if(err){
      console.log(err);
      next(err);
    }else{
      response.redirect('/');
    }

  })
});

// router.get('/checkIsAuthenticated', function(request, response, next){
//   // response.send(request.isAuthenticated());
//   response.send(request.user);
//
//   if(!request.user){
//     console.log('no one logged in');
//   } else {
//     console.log('logged in');
//   }
//
// });



module.exports = router;
