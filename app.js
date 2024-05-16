var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser    = require('body-parser');
var indexRouter = require('./routes');
//var usersRouter = require('./routes/users');
var billRouter = require('./routes/bill.router');
var logsRouter = require('./routes/logs.router');
var customerRouter = require('./routes/customer.router');
var cors = require('cors')
var app = express();

var corsOptions = {
  //origin: 'https://dte-app-34d7c4a76afc.herokuapp.com/',
  origin: 'http://localhost:8080/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/', usersRouter);
app.use('/', billRouter);
app.use('/', logsRouter);
app.use('/', customerRouter);


//require('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/* app.post('/api/bill/uploadFile', upload.single('file'), (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
  return res.json({ message: 'Upload success' });
}); */

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
