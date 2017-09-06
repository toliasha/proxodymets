var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var render = require('./tools/render');
var expressLayouts = require('express-ejs-layouts');

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
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('layout', 'layouts/default');

app.use(render.prepare);

app.get('/', render.index);
app.get('/menu-pub', render.menuPub);
app.get('/menu-restaurant', render.menuRestaurant);
app.get('/gallery', render.gallery);
app.get('/getMenu', render.getMenu);

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.render('404.ejs', {layout: 'layouts/error'});
});

// error handler
/*
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/

module.exports = app;
