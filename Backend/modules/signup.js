const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const db = require('../db.js');
const CustomerProfileSignUpModel = require('../models/SignUpCustomerModel');

router.post('/customer', (req, res) => {

  CustomerProfileSignUpModel.find({
    email: req.body.email}, (error, result) => {
        if(result.length === 0){
          CustomerProfileSignUpModel.insertMany({
            type: "customer",
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password,
            zipcode: req.body.zipcode,
            month: req.body.month,
            date: req.body.date,
            year: req.body.year
          }, (error, result) => {
            if (error) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                })
                res.end("Error");  
            }
            else {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(("USER_ADDED"));
            }
        })
        } else {
          res.end("USER_EXISTS")
        }
    }
  )
    // var hashedPassword = passwordHash.generate(req.body.password);
    // let sql = `CALL customer_put('${req.body.fname}','${req.body.lname}', '${req.body.email}', '${hashedPassword}', '${req.body.zipcode}', '${req.body.month}','${req.body.date}','${req.body.year}');`;
  
    // db.query(sql, (err, result) => {
    //   if (err) {
    //     res.end("Error in Data");
    //   }
    //   if (result && result.length > 0 && result[0][0].status === 'USER_ADDED') {
    //     res.end(result[0][0].status);
    //   }
    //   else if (result && result.length > 0 && result[0][0].status === 'USER_EXISTS') {
    //     res.end(result[0][0].status)
    //   }
    // });
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