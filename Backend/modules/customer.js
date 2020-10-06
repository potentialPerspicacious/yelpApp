const express = require("express");
const router = express.Router();
const db = require('../db.js');

router.post('/editProfile/:user_id', (req, res) => {
    let sql = `CALL Customer_Update_BasicProfile('${req.params.user_id}', '${req.body.fname}', '${req.body.lname}', '${req.body.gender}', '${req.body.headline}', '${req.body.city}', '${req.body.email}', '${req.body.zipcode}', '${req.body.address}', '${req.body.contact}', '${req.body.nickname}', '${req.body.yelptime}', '${req.body.hobbies}', '${req.body.about}','${req.body.social}');`;
    db.query(sql, (err, result) => {
      if (err) {
        res.end("Error in Data");
      }
      if (result && result.length > 0 && result[0][0].status === 'USER_UPDATED') {
        res.end(result[0][0].status);
      }
    });
  });

  router.post('/order/:user_id/:resID/:dishID', (req, res) => {
    let sql = `CALL add_orders('${req.params.user_id}', '${req.params.resID}', '${req.params.dishID}');`;
    db.query(sql, (err, result) => {
      if (err) {
        res.end("Error in Data");
      } else {
        res.end(result[0][0].status);
      }
    });
  });
  router.get('/OrderItems/:user_id/:resID/', (req, res) => {
    console.log(req.params.user_id)
    let sql = `CALL get_orderItems('${req.params.user_id}', '${req.params.resID}');`;
    db.query(sql, (err, result) => {
      console.log(result[0][0])
      if (err) {
        res.end("Error in Data");
      } 
      if(result[0][0].STATUS === "ITEM_NOT_PRESENT"){
        res.end(result[0][0].STATUS);
      }
      else
      {
        res.end(JSON.stringify(result[0]));
      }
    });
  });
  router.get('/OrderList/:resID', (req, res) => {
    let sql = `CALL get_orderList('${req.params.resID}')`;
    db.query(sql, (err, result) => {  
            if (err) {
        res.end("Error in Data");
      } else {
        res.end(JSON.stringify(result[0][0]));
      }
    });
  });
  router.post('/cancelOrders/:user_id/:resID/', (req, res) => {
    let sql = `CALL cancel_orders('${req.params.user_id}', '${req.params.resID}')`;
    db.query(sql, (err, result) => {  
        res.end((result[0][0]).STATUS);
    });
  });
module.exports = router;