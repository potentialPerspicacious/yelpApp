const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
// const db = require('../db.js');

// router.post('/', (req, res) => {
//     let sql = ""
//     if (req.body.isOwner === "on"){
//           sql = `CALL password_get('${req.body.username}');`;
//     } else {

//       sql = `CALL cpassword_get('${req.body.username}');`;
//     }
//     db.query(sql, (err, result) => {
//       if (err) {
//         res.writeHead(500, {
//           'Content-Type': 'text/plain'
//         });
//         res.send("Database Error");
//       }
//       if (result && result.length > 0 && result[0][0].status) {
//         if (passwordHash.verify(req.body.password, result[0][0].password)) {
//           res.cookie('cookie', "admin", { maxAge: 90000000, httpOnly: false, path: '/' });
//           req.session.user = req.body.email;
//           let userObject = {}
//           if (result[0][0].isOwner === "off") {
//            userObject = { user_id: result[0][0].idcustomer, email_id: result[0][0].email, isOwner: result[0][0].isOwner};
//           } else {
//             userObject = {user_id: result[0][0].idrestaurant, email_id: result[0][0].email, zipcode: result[0][0].zipcode, isOwner: result[0][0].isOwner}
//           }
//           res.end(JSON.stringify(userObject));
//         }
//         else {
//           res.end("INCORRECT_PASSWORD");
//         }
//       }
//       else {
//         res.writeHead(401, {
//           'Content-Type': 'text/plain'
//         })
//         res.end("NO_USER");
//       }
//     });
//   });

// module.exports = router;


const Users = require('../Models/UserModel.js');
const restaurant = Users.restaurant;
const customer = Users.customer;
router.post('/:isOwner',(req, res) => {
if(req.params.isOwner === ":on") {
  restaurant.findOne({ email: req.body.username, password: req.body.password }, (error, user) => {
      if (error) {
          res.writeHead(500, {
              'Content-Type': 'text/plain'
          })
          res.end("Error Occured");
      }
      if (user) {
          res.cookie('cookie', user.email, { maxAge: 900000, httpOnly: false, path: '/' });
          req.session.user = user;
          res.writeHead(200, {
              'Content-Type': 'text/plain'
          })
          res.end(JSON.stringify(user));
      }
      else {
          res.writeHead(401, {
              'Content-Type': 'text/plain'
          })
          res.end("INCORRECT_PASSWORD");
      }

  });    
}else {
    customer.findOne({ email: req.body.username, password: req.body.password }, (error, user) => {
        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end("Error Occured");
        }
        if (user) {
            res.cookie('cookie', user.email, { maxAge: 900000, httpOnly: false, path: '/' });
            req.session.user = user;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end(JSON.stringify(user));
        }
        else {
            res.writeHead(401, {
                'Content-Type': 'text/plain'
            })
            res.end("INCORRECT_PASSWORD");
        }
  
    });  
}
});


module.exports = router;