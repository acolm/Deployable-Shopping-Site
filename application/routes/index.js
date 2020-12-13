/*
    index.js
    
    Description: Contains the route fetching the index page from the server
*/

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', {root:'public/HTML'});
});

router.get('/registration', function(req, res, next) {
  res.sendFile('registration.html', {root:'public/HTML'});
})

router.get('/login', function(req,res,next) {
  res.sendFile('login.html', {root:'public/HTML'});
})

router.get('/aboutus', function(req, res, next) {
  res.sendFile('aboutus.html', {root:'public/HTML'});
})

module.exports = router;
