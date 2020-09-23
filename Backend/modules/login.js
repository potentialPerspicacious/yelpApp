const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const db = require('../db.js');

router.post('/', (req, res) => {
    let sql = `CALL password_get('${req.body.username}');`;

    db.query(sql, (err, result) => {
      // console.log(result[0][0].password)
      // console.log(req.body.password)
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.send("Database Error");
      }
      if (result && result.length > 0 && result[0][0].status) {
        // console.log(result)
        if (passwordHash.verify(req.body.password, result[0][0].password)) {
          res.cookie('cookie', "admin", { maxAge: 90000000, httpOnly: false, path: '/' });
          req.session.user = req.body.email;
          // console.log("OK")
          let userObject = { user_id: result[0][0].idrestaurant, name: result[0][0].name, email_id: result[0][0].email, zipcode: result[0][0].zipcode.slice(1)};
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