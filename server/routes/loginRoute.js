var router = require('express').Router()
var passport = require('passport');
var path = require('path');



router.get('/', function(request, response, next){
  response.sendFile(path.join(__dirname, '../public/views/login.html'));
});

router.post('/',
  passport.authenticate('local', {
    successRedirect: 'http://localhost:3000/home',
    failureRedirect: '/'
  })
);



module.exports = router;
