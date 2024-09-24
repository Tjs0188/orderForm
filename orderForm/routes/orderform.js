var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('orderform', {title: "Order Form"});
});

module.exports = router;