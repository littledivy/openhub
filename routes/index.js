var express = require('express');
var router = express.Router();
var indexController = require("../controllers/index");

/* GET home page. */
router.get('/', function(req, res, next) {
  indexController.start(req, function(user) {
    res.render('index', { title: 'Express', user:user });
  })
});

router.get('/@:username', function(req, res, next) {
  console.log(req.params.username);
  indexController.user(req, function(userData) {
    console.info(userData);
    res.render('user/index', {
      user:req.session.user,
      profile:userData
    })
  })
  
})

module.exports = router;
