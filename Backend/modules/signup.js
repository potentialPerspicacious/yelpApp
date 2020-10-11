const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const db = require('../db.js');

router.post('/customer', (req, res) => {
    var hashedPassword = passwordHash.generate(req.body.password);
    let sql = `CALL customer_put('${req.body.fname}','${req.body.lname}', '${req.body.email}', '${hashedPassword}', '${req.body.zipcode}', '${req.body.month}','${req.body.date}','${req.body.year}');`;
  
    db.query(sql, (err, result) => {
      if (err) {
        res.end("Error in Data");
      }
      if (result && result.length > 0 && result[0][0].status === 'USER_ADDED') {
        res.end(result[0][0].status);
      }
      else if (result && result.length > 0 && result[0][0].status === 'USER_EXISTS') {
        res.end(result[0][0].status)
      }
    });
  });
  
  router.post('/restaurant', (req, res) => {
    var hashedPassword = passwordHash.generate(req.body.password);
    let sql = `CALL restaurant_put('${req.body.rname}', '${req.body.email}', '${hashedPassword}', '(${req.body.zipcode}');`;
    db.query(sql, (err, result) => {
      if (err) {
        res.end("Error in Data");
      }
      if (result && result.length > 0 && result[0][0].status === 'USER_ADDED') {
        res.end(result[0][0].status);
      }
      else if (result && result.length > 0 && result[0][0].status === 'USER_EXISTS') {
        res.end(result[0][0].status);
      } 
    });
  });

module.exports = router;