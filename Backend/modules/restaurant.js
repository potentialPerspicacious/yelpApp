const express = require("express");
const router = express.Router();
const db = require('../db.js');

router.post('/editProfile/:user_id', (req, res) => {
    let sql = `CALL Restaurant_Update_BasicProfile('${req.params.user_id}', '${req.body.rname}', '${req.body.email}', '${req.body.zipcode}', '${req.body.location}', '${req.body.contact}', '${req.body.cusine}', '${req.body.description}', '${req.body.timings}');`;
    db.query(sql, (err, result) => {
      if (err) {
        res.end("Error in Data");
      }
      if (result && result.length > 0 && result[0][0].status === 'USER_UPDATED') {
        res.end(result[0][0].status);
      }
    });
  });

  router.get('/orderHistory/:resID', (req, res) => {
    let sql = `CALL get_RorderHistory('${req.params.resID}')`;
    db.query(sql, (err, result) => {  
            if (err) {
        res.end("Error in Data");
      } else {
        res.end(JSON.stringify(result[0]));
      }
    });
  });
  router.post('/updateOrder/', (req, res) => {
    let sql = `CALL update_orders('${req.params.user_id}', '${req.body.orderID}', '${req.body.orderStatus}', '${req.body.orderType}');`;
    db.query(sql, (err, result) => {
      if (err) {
        res.end("Error in Data");
      }
      if (result && result.length > 0 && result[0][0].status === 'ORDER_UPDATED') {
        res.end(result[0][0].status);
      }
    });
  });
module.exports = router;