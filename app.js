var express = require('express');
var router = express.Router();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var flights = require('./routes/flights');

var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var myobj = [{
    name: 'John',
    address: 'Highway 71'
  },
  {
    name: 'Peter',
    address: 'Lowstreet 4'
  },
  {
    name: 'Amy',
    address: 'Apple st 652'
  },
  {
    name: 'Hannah',
    address: 'Mountain 21'
  },
  {
    name: 'Michael',
    address: 'Park Lane 38'
  },
  {
    name: 'Sandy',
    address: 'Ocean blvd 2'
  },
  {
    name: 'Betty',
    address: 'Green Grass 1'
  },
  {
    name: 'Richard',
    address: 'Sky st 331'
  },
  {
    name: 'Susan',
    address: 'One way 98'
  },
  {
    name: 'Vicky',
    address: 'Yellow Garden 2'
  },
  {
    name: 'Ben',
    address: 'Park Lane 38'
  },
  {
    name: 'William',
    address: 'Central st 954'
  },
  {
    name: 'Chuck',
    address: 'Main Road 989'
  },
  {
    name: 'Viola',
    address: 'Sideway 1633'
  }
];

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  //db.collection("customers").deleteMany({});
  db.collection("customers").insertMany(myobj, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/flights', flights)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;