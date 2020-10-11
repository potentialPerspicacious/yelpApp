const express = require("express");
const router = express.Router();
const db = require('../db.js');

router.post('/editProfile/:user_id', (req, res) => {
    let sql = `CALL Restaurant_Update_BasicProfile('${req.params.user_id}', '${req.body.rname}', '${req.body.email}', '${req.body.zipcode}', '${req.body.location}', '${req.body.contact}', '${req.body.cusine}', '${req.body.description}', '${req.body.timings}', '${req.body.dinein}', '${req.body.takeout}', '${req.body.ydelivery}');`;
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
  router.get('/orderHistoryFilter/:resID/:filter', (req, res) => {
    let sql = `CALL get_RorderHistoryFilter('${req.params.resID}', '${req.params.filter}')`;
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
  router.post('/review/:user_id/:resID', (req, res) => {
    let sql = `CALL add_review('${req.params.user_id}', '${req.params.resID}', '${req.body.reviews}', '${req.body.rating}');`;
    db.query(sql, (err, result) => {
      if (err) {
        res.end("Error in Data");
      } else {
        res.end(result[0][0].status);
      }
    });
  });
  router.get('/getReviews/:resID/', (req, res) => {
    let sql = `CALL get_reviews('${req.params.resID}')`;
    db.query(sql, (err, result) => {  
            if (err) {
        res.end("Error in Data");
      } else {
        res.end(JSON.stringify(result[0]));
      }
    });
  });

  router.post('/addevent/:user_id', (req, res) => {
    let sql = `CALL add_event('${req.params.user_id}', '${req.body.eventname}', '${req.body.description}', '${req.body.month}', '${req.body.date}', '${req.body.year}', '${req.body.time}', '${req.body.location}', '${req.body.hashtags}');`;
    db.query(sql, (err, result) => {
      if (err) {
        res.end("Error in Data");
      } else {
        res.end(result[0][0].status);
      }
    });
  });
  router.get('/getEvents/:resID/', (req, res) => {
    let sql = `CALL get_events('${req.params.resID}')`;
    db.query(sql, (err, result) => {  
            if (err) {
        res.end("Error in Data");
      } else {
        res.end(JSON.stringify(result[0]));
      }
    });
  });
  router.get('/getRegisteredPeople/:eventID/', (req, res) => {
    let sql = `CALL getRegisteredPeople('${req.params.eventID}')`;
    db.query(sql, (err, result) => {  
            if (err) {
        res.end("Error in Data");
      } else {
        res.end(JSON.stringify(result[0]));
      }
    });
  });
module.exports = router;