const express = require("express");
const router = express.Router();
const db = require('../db.js');

router.get('/restaurant/:user_id', (req, res) => {
    let sql = `CALL Restaurant_Profile_get('${req.params.user_id}', NULL, NULL);`;
    db.query(sql, (err, result) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end("Error in Data");
      }
      if (result && result.length > 0 && result[0][0]) {
        // res.writeHead(200, {
        //   'Content-Type': 'text/plain'
        // });
        res.end(JSON.stringify(result[0][0]));
      }
    });
  });

  router.get('/customer/:user_id', (req, res) => {
    let sql = `CALL Customer_Profile_get('${req.params.user_id}');`;
    db.query(sql, (err, result) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end("Error in Data");
      }
      if (result && result.length > 0 && result[0][0]) {
        // res.writeHead(200, {
        //   'Content-Type': 'text/plain'
        // });
        res.end(JSON.stringify(result[0][0]));
      }
    });
  });

  module.exports = router;