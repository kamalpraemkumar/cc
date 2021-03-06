const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
// var cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

const index = require('./routes/index');
const users = require('./routes/users');
const admin = require('./routes/admin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser('keyboard cat'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(flash());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/index', index);
app.use('/users', users);
app.use('/admin', admin);

//bootstrap components
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css-sand', express.static(__dirname + '/node_modules/bootswatch/sandstone')); // redirect CSS bootstrap
app.use('/css-hero', express.static(__dirname + '/node_modules/bootswatch/superhero')); // redirect CSS bootstrap
app.use('/css-cerulean', express.static(__dirname + '/node_modules/bootswatch/cerulean')); // redirect CSS bootstrap
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/fonts')); // redirect fonts bootstrap
//additional libraries
app.use('/datatables', express.static(__dirname + '/node_modules/datatables.net')); // redirect JS dt
app.use('/datatables', express.static(__dirname + '/node_modules/datatables.net-dt')); // redirect CSS dt
app.use('/chart', express.static(__dirname + '/node_modules/chart.js/dist'));
app.use('/bt-slider', express.static(__dirname + '/node_modules/bootstrap-slider/dist')); // redirect bt-slider

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

app.locals.site = {
  title: 'KK Cyber Cafe Solution',
  rate: 10.00
};

module.exports = app;
