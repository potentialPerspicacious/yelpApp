const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const db = require('../db.js');

router.post('/', (req, res) => {
    let sql = ""
    if (req.body.isOwner === "on"){
          sql = `CALL password_get('${req.body.username}');`;
    } else {

      sql = `CALL cpassword_get('${req.body.username}');`;
    }
    db.query(sql, (err, result) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.send("Database Error");
      }
      if (result && result.length > 0 && result[0][0].status) {
        if (passwordHash.verify(req.body.password, result[0][0].password)) {
          res.cookie('cookie', "admin", { maxAge: 90000000, httpOnly: false, path: '/' });
          req.session.user = req.body.email;
          // console.log("OK")
          let userObject = {}
          if (result[0][0].isOwner === "off") {
           userObject = { user_id: result[0][0].idcustomer, email_id: result[0][0].email, isOwner: result[0][0].isOwner};
          } else {
            userObject = {user_id: result[0][0].idrestaurant, email_id: result[0][0].email, zipcode: result[0][0].zipcode, isOwner: result[0][0].isOwner}
          }
          // res.writeHead(200, {
          //   'Content-Type': 'text/plain'
          // })
          res.end(JSON.stringify(userObject));
        }
        else {
          // res.writeHead(401, {
          //   'Content-Type': 'text/plain'
          // });
          res.end("INCORRECT_PASSWORD");
        }
      }
      else {
        res.writeHead(401, {
          'Content-Type': 'text/plain'
        })
        res.end("NO_USER");
      }
    });
  });

module.exports = router;