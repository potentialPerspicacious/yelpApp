const express = require("express");
const router = express.Router();
const db = require('../db.js');

router.get('/restaurants/:find/:location/:search', (req, res) => {
    if (req.params.find === 'undefined'){
        req.params.find = 'null'
    }
    if (req.params.location === 'undefined'){
        req.params.location = 'null'
    }
    let sql = null
    if (req.params.search === 'false'){
      sql = `CALL get_restaurants('${req.params.find}');`;

    } else {
    sql = `CALL get_restaurantsFromName('${req.params.find}');`;
  }
    db.query(sql, (err, result) => {
        if (err) {
            res.end("Error in Data");
          } else{
            res.end(JSON.stringify(result[0]));
          }
    });
  });
  router.get('/restaurantsFilter/:find/:location/:filter', (req, res) => {
    if (req.params.find === 'undefined'){
        req.params.find = 'null'
    }
    if (req.params.location === 'undefined'){
        req.params.location = 'null'
    }
    let sql = `CALL get_restaurantsFilter('${req.params.location}', '${req.params.find}', '${req.params.filter}');`;
    db.query(sql, (err, result) => {
        if (err) {
            res.end("Error in Data");
          } else{
            res.end(JSON.stringify(result[0]));
          }
    });
  });

  router.get('/locations/:find/:location', (req, res) => {
    if (req.params.find === 'undefined'){
        req.params.find = 'null'
    }
    if (req.params.location === 'undefined'){
        req.params.location = 'null'
    }
    let sql = `CALL get_locations('${req.params.location}', '${req.params.find}');`;
    db.query(sql, (err, result) => {
        if (err) {
            res.end("Error in Data");
          } else{
            res.end(JSON.stringify(result[0]));
          }
    });
  });
  router.get('/locationsFilter/:find/:location/:filter', (req, res) => {
    if (req.params.find === 'undefined'){
        req.params.find = 'null'
    }
    if (req.params.location === 'undefined'){
        req.params.location = 'null'
    }
    let sql = `CALL get_locationFilter('${req.params.location}', '${req.params.find}', '${req.params.filter}');`;
    db.query(sql, (err, result) => {
        if (err) {
            res.end("Error in Data");
          } else{
            res.end(JSON.stringify(result[0]));
          }
    });
  });

module.exports = router;