var express = require('express');
var router = express.Router();
var authHandler = require('../controllers/auth');

/* GET users listing. */
router.get('/new', (req, res, next) => {res.render('auth/signup')});
router.get('/login', (req, res, next) => {res.render('auth/login')});
router.post('/new', authHandler.new);
router.post('/login', authHandler.login);


module.exports = router;
