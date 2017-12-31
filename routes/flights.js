var express = require('express');
var router = express.Router();
var flights = require('../public/json/flight-search-results.json');

/* GET flights listing. */
router.get('/', function (req, res, next) {
    res.json(flights);
});

module.exports = router;