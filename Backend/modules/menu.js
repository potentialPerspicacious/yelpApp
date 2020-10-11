const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const db = require('../db.js');

router.post('/addItem', (req, res) => {
    let sql = `CALL add_item('${(req.body.user_id)}','${req.body.dishname}', '${req.body.category}', '${req.body.ingredients}', '${req.body.description}', '${req.body.price}', '${req.body.image}');`;
    db.query(sql, (err, result) => {
      if (err) {
        res.end("Error in Data");
      }
      if (result && result.length > 0 && result[0][0].status === 'ITEM_ADDED') {
        res.end(result[0][0].status);
      }
      else if (result && result.length > 0 && result[0][0].status === 'ITEM_EXISTS') {
        res.end(result[0][0].status)
      }
    });
  });

  router.get('/items/:user_id', (req, res) => {
    let sql = `CALL get_items('${(req.params.user_id)}');`;
    db.query(sql, (err, result) => {
      if (err) {
        res.end("Error in Data");
      } else{
        res.end(JSON.stringify(result[0]));
      }
    });
  });

  router.get('/editItem/:dishID', (req, res) => {
    let sql = `CALL get_dish('${(req.params.dishID)}');`;
    db.query(sql, (err, result) => {
      if (err) {
        res.end("Error in Data");
      } else{
        res.end(JSON.stringify(result[0][0]));
      }
    });
  });

  router.post('/updateItem/:dishID', (req, res) => {
    let sql = `CALL update_dish('${(req.params.dishID)}','${req.body.name}', '${req.body.category}', '${req.body.ingredients}', '${req.body.description}', '${req.body.price}');`;
    db.query(sql, (err, result) => {
      if (err) {
        res.end("Error in Data");
      }
      if (result && result.length > 0 && result[0][0].status === 'ITEM_UPDATED') {
        res.end(result[0][0].status);
      }
    });
  });

  module.exports = router;