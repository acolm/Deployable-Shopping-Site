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

module.exports = router;
