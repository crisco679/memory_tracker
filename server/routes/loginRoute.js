var router = require('express').Router()
var passport = require('passport');
var path = require('path');



router.get('/', function(request, response, next){
  response.sendFile(path.join(__dirname, '../public/views/login.html'));
});
//This needs to be worked with more it's not doing what it's supposed to
router.get('/*', function(request, response, next){
	if(request.isAuthenticated()){
		next() //User is logged in, carry on.
	} else {
		response.redirect('/login') //Not logged in, send back.
	}
});

router.post('/',
  passport.authenticate('local', {
    successRedirect: 'http://localhost:3000/home',
    failureRedirect: '/'
  })
);



module.exports = router;
