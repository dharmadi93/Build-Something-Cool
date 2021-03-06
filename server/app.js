require('dotenv').config()

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session')
const cors = require('cors')

const Employee = require('./models/employee')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

var routes = require('./routes/index');
var employees = require('./routes/employee');
var items = require('./routes/item');
var transactions = require('./routes/transaction');
var transactionsDetails = require('./routes/transactionDetail');
var reports = require('./routes/report');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 6000000
  },
  resave: false,
  saveUninitialized: false
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

// passport.use(Employee.createStrategy());

// passport.serializeUser(Employee.serializeUser());
// passport.deserializeUser(Employee.deserializeUser());

app.use('/', routes);
app.use('/api/employee', employees);
app.use('/api/item', items);
app.use('/api/transaction', transactions);
app.use('/api/transaction_detail', transactionsDetails);
app.use('/api/report', reports);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
