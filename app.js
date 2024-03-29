var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var connectionStringsDB = require('./models/globals').remote;
var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var reportsRouter = require('./routes/reports');
var placesRouter = require('./routes/places');
var spotsRouter = require('./routes/spots');

mongoose.connect(connectionStringsDB, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to Database ;-)');
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reports', reportsRouter);
app.use('/places', placesRouter);
app.use('/spots', spotsRouter)

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
