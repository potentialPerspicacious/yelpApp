const express = require("express");
const router = express.Router();
const db = require('../db.js');
const CustomerProfile = require('../models/CustomerProfileModel')
const Orders = require('../models/OrdersModel.js');
const Menu = require('../Models/MenuModel.js');



// router.post('/editProfile/:user_id', (req, res) => {
//     let sql = `CALL Customer_Update_BasicProfile('${req.params.user_id}', '${req.body.fname}', '${req.body.lname}', '${req.body.gender}', '${req.body.headline}', '${req.body.city}', '${req.body.email}', '${req.body.zipcode}', '${req.body.address}', '${req.body.contact}', '${req.body.nickname}', '${req.body.yelptime}', '${req.body.hobbies}', '${req.body.about}','${req.body.social}');`;
//     db.query(sql, (err, result) => {
//       if (err) {
//         res.end("Error in Data");
//       }
//       if (result && result.length > 0 && result[0][0].status === 'USER_UPDATED') {
//         res.end(result[0][0].status);
//       }
//     });
//   });

router.post('/editProfile/:user_id', (req, res) => {
  CustomerProfile.findByIdAndUpdate(req.params.user_id, {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    zipcode: req.body.zipcode,
    profileInfo: { gender: req.body.gender,
    headline: req.body.headline,
    city: req.body.city,
    address: req.body.address,
    contact: req.body.contact,
    nickname: req.body.nickname,
    yelptime: req.body.yelptime,
    hobbies: req.body.hobbies,
    about: req.body.about,
    social: req.body.social
    }}, (error, result) => {
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
          res.end("USER_UPDATED");
      }
  });
});

  router.post('/order/:user_id/:resID/:dishID', (req, res) => {
    // console.log(req.params.user_id)
    // console.log(req.params.resID)
    // console.log(req.params.dishID)
    Orders.find({resID: req.params.resID, cusID: req.params.user_id, orderPlaced: "NO"}, (err, result) => {
      if (result.length === 0){
        Orders.insertMany({
          orderPlaced: "NO", 
          resID: req.params.resID,
          cusID: req.params.user_id,
          dishes : {
            dishID: req.params.dishID,
            quantity: 1
          }
        }, (err2, result) => {
          if (err2) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end("Error");  
        }
        else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(("ITEM_ADDED"));
        }

        })
      } else {
        Orders.find({resID: req.params.resID, cusID: req.params.user_id, "dishes.dishID": req.params.dishID, orderPlaced: "NO"},
       (err4, res4)=> {
         if(res4.length === 0){
           console.log("no here")
          Orders.update({resID: req.params.resID, cusID: req.params.user_id, orderPlaced: "NO"}, {
          $push: {'dishes': {
            dishID: req.params.dishID,
            quantity: 1
          }}}, (err5, res5)=> {
            if (err) {
              res.writeHead(500, {
                  'Content-Type': 'text/plain'
              })
              res.end("Error");  
          }
          else {
              res.writeHead(200, {
                  'Content-Type': 'application/json'
              });
              res.end(("ITEM_ADDED"));
          }
          }
          )
         } else {
           console.log("This is good")
          Orders.findOneAndUpdate({resID: req.params.resID, cusID: req.params.user_id, "dishes.dishID": req.params.dishID, orderPlaced: "NO"},   {$inc: {"dishes.$.quantity": 1}}, (err3 ,res3) => {
            console.log(res3)
            if (err3) {
              res.writeHead(500, {
                  'Content-Type': 'text/plain'
              })
              res.end("Error");  
          }
          else {
              res.writeHead(200, {
                  'Content-Type': 'application/json'
              });
              res.end(("ITEM_ADDED"));
          }
          })
         }
       })

      }
    } )

    // let sql = `CALL add_orders('${req.params.user_id}', '${req.params.resID}', '${req.params.dishID}');`;
    // db.query(sql, (err, result) => {
    //   if (err) {
    //     res.end("Error in Data");
    //   } else {
    //     res.end(result[0][0].status);
    //   }
    // });
  });
  router.get('/OrderItems/:user_id/:resID/', (req, res) => {
    var out = []
    Orders.find({resID: req.params.resID, cusID: req.params.user_id, orderPlaced: "NO"}, (err1, orders) => {
      if(orders[0].dishes.length > 0){
        Menu.findOne({_id: req.params.resID}, (err2, dishes) => {
          for(i=0; i< orders[0].dishes.length; i++){
            for(j=0; j< dishes.dishes.length; j++){
              if(JSON.stringify(orders[0].dishes[i].dishID) === JSON.stringify(dishes.dishes[j]._id)){
                dishes.dishes[j]._doc.quantity = orders[0].dishes[i].quantity
                out.push(dishes.dishes[j])
              }
            }
          }
          console.log(out)
          res.end(JSON.stringify(out));
        })

      }
    })




    // let sql = `CALL get_orderItems('${req.params.user_id}', '${req.params.resID}');`;
    // db.query(sql, (err, result) => {
    //   if (err) {
    //     res.end("Error in Data");
    //   } 
    //   if(result[0][0].STATUS === "ITEM_NOT_PRESENT"){
    //     res.end(result[0][0].STATUS);
    //   }
    //   else
    //   {
    //     res.end(JSON.stringify(result[0]));
    //   }
    // });
  });
  router.get('/OrderList/:resID/:', (req, res) => {

    
    // let sql = `CALL get_orderList('${req.params.resID}')`;
    // db.query(sql, (err, result) => {  
    //         if (err) {
    //     res.end("Error in Data");
    //   } else {
    //     res.end(JSON.stringify(result[0][0]));
    //   }
    // });
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