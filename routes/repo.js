var express = require('express');
var router = express.Router();
var repoController = require("../controllers/repo");

/* GET repoCreation page. */
router.get('/', function(req, res, next) {
  res.render('new/index', { title:'OpenHub - New Repository', user:req.session.user })
});

router.post('/', function(req, res, next) {
  repoController.new(req, function(user) {
    res.render('index', { title: 'Express', user:user });
  })
});

module.exports = router;
