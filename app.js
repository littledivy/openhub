var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require("express-session");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var yaml = require('js-yaml');
var fs = require('fs')

hbs.registerHelper('checkUser', function(x) { 
  console.info(x)
  if(!x.data.root.user) return x.fn();
 });

var indexRouter = require('./routes/index');
var authenticationRouter = require('./routes/auth');
var repoCreationRouter = require('./routes/repo');

var app = express();
app.conf = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


var cooky = {
  secret: "work hard",
  resave: true,
  expires: new Date() * 60 * 60 * 24 * 7,
  saveUninitialized: true
};

app.sessionMiddleware = session(cooky);

app.set("trust proxy", 1); // trust first proxy
app.use(app.sessionMiddleware);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/portal', authenticationRouter);
app.use('/new', repoCreationRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
