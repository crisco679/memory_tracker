var router = require('express').Router();
var express = require('express');
var path = require('path');
var model = require('../models/model.js');
var mongoose = require('mongoose');
var passport = require('passport');

router.use(express.static('server/public'))
router.get('/home', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/home.html'))
})
router.get('/memories', function(request, response){
	response.sendFile(path.join(__dirname, '../public/views/memories.html'))
})

module.exports = router;
