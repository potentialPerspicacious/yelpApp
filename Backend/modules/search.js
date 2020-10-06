const express = require("express");
const router = express.Router();
const db = require('../db.js');

router.get('/restaurants/:find/:location', (req, res) => {
    if (req.params.find === 'undefined'){
        req.params.find = 'null'
    }
    if (req.params.location === 'undefined'){
        req.params.location = 'null'
    }
    let sql = `CALL get_restaurants('${req.params.location}', '${req.params.find}');`;
    db.query(sql, (err, result) => {
        if (err) {
            res.end("Error in Data");
          } else{
            res.end(JSON.stringify(result[0]));
          }
    });
  });

module.exports = router;