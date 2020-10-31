const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const db = require('../db.js');

const Menu = require('../Models/MenuModel.js');

router.post('/addItem/:user_id', (req, res) => {
  Menu.update({_id: req.params.user_id}, { $push : { 'dishes':  {
      name: req.body.dishname,
      ingredients: req.body.ingredients,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price
     }}}, (error, result) => {
      if (error) {
          res.writeHead(500, {
              'Content-Type': 'text/plain'
          })
          res.end();  
      }
      else {
          res.writeHead(200, {
              'Content-Type': 'application/json'
          });
          res.end("ITEM_ADDED");
      }
  });
    // let sql = `CALL add_item('${(req.body.user_id)}','${req.body.dishname}', '${req.body.category}', '${req.body.ingredients}', '${req.body.description}', '${req.body.price}', '${req.body.image}');`;
    // db.query(sql, (err, result) => {
    //   if (err) {
    //     res.end("Error in Data");
    //   }
    //   if (result && result.length > 0 && result[0][0].status === 'ITEM_ADDED') {
    //     res.end(result[0][0].status);
    //   }
    //   else if (result && result.length > 0 && result[0][0].status === 'ITEM_EXISTS') {
    //     res.end(result[0][0].status)
    //   }
    // });
  });

  router.get('/items/:user_id', (req, res) => {
    Menu.find({_id: req.params.user_id}, (error, result) => {
      if (error) {
          res.writeHead(500, {
              'Content-Type': 'text/plain'
          })
          res.end();  
      }
      else {
          res.writeHead(200, {
              'Content-Type': 'application/json'
          });
          res.end(JSON.stringify(result[0].dishes));
      }
  });
    // Menu.find()
    // let sql = `CALL get_items('${(req.params.user_id)}');`;
    // db.query(sql, (err, result) => {
    //   console.log(result[0])
    //   if (err) {
    //     res.end("Error in Data");
    //   } else{
    //     res.end(JSON.stringify(result[0]));
    //   }
    // });


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