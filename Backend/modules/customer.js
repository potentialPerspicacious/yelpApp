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
    let sql = `CALL get_orderItems('${req.params.user_id}', '${req.params.resID}');`;
    db.query(sql, (err, result) => {
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

  router.post('/placeOrder/:user_id/:resID/:orderstatus/:ordermode', (req, res) => {
    let sql = `CALL place_order('${req.params.user_id}', '${req.params.resID}', '${req.params.orderstatus}', '${req.params.ordermode}')`;
    db.query(sql, (err, result) => {  
        res.end((result[0][0]).status);
    });
  });
  router.get('/orderHistory/:cusID', (req, res) => {
    let sql = `CALL get_orderHistory('${req.params.cusID}')`;
    db.query(sql, (err, result) => {  
            if (err) {
        res.end("Error in Data");
      } else {
        res.end(JSON.stringify(result[0]));
      }
    });
  });
  router.get('/orderHistoryFilter/:cusID/:filter', (req, res) => {
    let sql = `CALL get_CorderHistoryFilter('${req.params.cusID}', '${req.params.filter}')`;
    db.query(sql, (err, result) => {  
            if (err) {
        res.end("Error in Data");
      } else {
        res.end(JSON.stringify(result[0]));
      }
    });
  });

  router.get('/getCEvents/:find/:location', (req, res) => {
    if (req.params.find === 'undefined'){
        req.params.find = 'null'
    }
    if (req.params.location === 'undefined'){
        req.params.location = 'null'
    }
    let sql = `CALL get_reqevents('${req.params.location}', '${req.params.find}');`;
    db.query(sql, (err, result) => {
        if (err) {
            res.end("Error in Data");
          } else{
            res.end(JSON.stringify(result[0]));
          }
    });
  });

  router.post('/registerEvent', (req, res) => {
    let sql = `CALL register_event('${req.body.eventid}', '${req.body.cusID}')`;
    db.query(sql, (err, result) => {  
        res.end((result[0][0]).status);
    });
  });

  router.get('/yourevents/:user_id/', (req, res) => {
    let sql = `CALL get_yourevents('${req.params.user_id}')`;
    db.query(sql, (err, result) => {  
            if (err) {
        res.end("Error in Data");
      } else {
        res.end(JSON.stringify(result[0]));
      }
    });
  });

module.exports = router;