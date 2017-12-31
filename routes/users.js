var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.once('open', function () {
  router.get('/', function (req, res, next) {
    var query = {
      address: "Park Lane 38"
    };
    console.log('db.collection("customers").find(query) ', db.collection("customers").find(query));
    db.collection("customers").find(query).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close();
    });
  });
});

module.exports = router;