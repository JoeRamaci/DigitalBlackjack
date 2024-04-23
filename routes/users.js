// Users.js handles user interactions?
// i.e, POST requests?

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  res.send('respond with a resource')
});

module.exports = router;
