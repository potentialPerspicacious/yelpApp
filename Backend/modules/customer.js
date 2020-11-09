const express = require("express");
const router = express.Router();
const db = require('../db.js');
var kafka = require("../kafka/client");

var passport = require("passport");
var jwt = require("jsonwebtoken");
var requireAuth = passport.authenticate("jwt", { session: false });

const CustomerProfile = require('../models/CustomerProfileModel')
const Orders = require('../models/OrdersModel.js');
const Menu = require('../Models/MenuModel.js');
const Profile = require('../Models/RestaurantProfileModel.js');
const Events = require('../models/EventsModel')
const RegisteredEvents = require('../models/RegisteredEventsModel')
const Message = require('../models/MessageModel')


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

router.post('/editProfile/:user_id', requireAuth, (req, res) => {
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

  router.post('/order/:user_id/:resID/:dishID', requireAuth, (req, res) => {
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
          Orders.findOneAndUpdate({resID: req.params.resID, cusID: req.params.user_id, "dishes.dishID": req.params.dishID, orderPlaced: "NO"},   {$inc: {"dishes.$.quantity": 1}}, (err3 ,res3) => {
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
  router.get('/OrderItems/:user_id/:resID/', requireAuth, (req, res) => {
    var out = []
    Orders.find({resID: req.params.resID, cusID: req.params.user_id, orderPlaced: "NO"}, (err1, orders) => {
      if(orders[0].dishes.length > 0){
        out.push(orders[0]._id)
        Menu.findOne({_id: req.params.resID}, (err2, dishes) => {
          for(i=0; i< orders[0].dishes.length; i++){
            for(j=0; j< dishes.dishes.length; j++){
              if(JSON.stringify(orders[0].dishes[i].dishID) === JSON.stringify(dishes.dishes[j]._id)){
                dishes.dishes[j]._doc.quantity = orders[0].dishes[i].quantity
                out.push(dishes.dishes[j])
              }
            }
          }
          // out._id = (orders[0]._id)
          res.end(JSON.stringify(out));
        })

      }
     kafka.make_request("cart", out, function(err, results) {
      if (err) {
        console.log("Inside err");
        response.json({
          status: "error",
          msg: "System Error, Try Again."
        });
      } else {
        console.log("Inside /items else in Backend");
        response.json({
          updatedList: results
        });
  
        response.end();
      }
    })
    });


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
  router.post('/cancelOrders/:orderID/', requireAuth, (req, res) => {
    Orders.findByIdAndRemove(req.params.orderID, (err, result)=>{
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
        res.end(("ORDER_CANCELLED"));
    }
    })
    // let sql = `CALL cancel_orders('${req.params.user_id}', '${req.params.resID}')`;
    // db.query(sql, (err, result) => {  
    //     res.end((result[0][0]).STATUS);
    // });
  });

  router.post('/placeOrder/:orderID/:orderstatus/:ordermode', requireAuth, (req, res) => {
    console.log(req.params.orderID)
    Orders.findByIdAndUpdate(req.params.orderID, {
      orderPlaced: "YES", 
      orderstatus: req.params.orderstatus,
      ordermode: req.params.ordermode,
      date: new Date()
    }, (err, result) => {
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
        res.end(("ORDER_PLACED"));
    }
    }
    )



    // let sql = `CALL place_order('${req.params.user_id}', '${req.params.resID}', '${req.params.orderstatus}', '${req.params.ordermode}')`;
    // db.query(sql, (err, result) => {  
    //     res.end((result[0][0]).status);
    // });
  });
  router.get('/orderHistory/:cusID', requireAuth, (req, res) => {
    var orderHistory = []
    var orderHisObj = {}
    var dishes = []
    Orders.find({cusID: req.params.cusID, orderPlaced:"YES"}, (err, result)=>{
      // console.log(result[0]._doc.dishes)
      if (result.length > 0){
        orderHistory.push("ITEM_PRESENT")

      } else {
        orderHistory.push("ITEM_NOT_PRESENT")
      }
      orderHisObj.ordermode = (result[0].ordermode),
      orderHisObj.orderstatus = result[0].orderstatus
      Profile.find({resID: req.params.resID}, (err2, res2) => {
        // console.log(res2[0]._doc.dishes)
        for (i=0;i<result[0]._doc.dishes.length; i++){
          for (j =0; j<res2[0]._doc.dishes.length; j++){
            // console.log( result[0]._doc.dishes[i].dishID)
            // console.log( JSON.stringify(res2[0]._doc.dishes[j]._id))
            if( JSON.stringify(result[0]._doc.dishes[i].dishID) === JSON.stringify(res2[0]._doc.dishes[j]._id)){
              dishes.push(res2[0]._doc.dishes[j].name)
            }
          }
        }
        // console.log(dishes)
        orderHisObj.name = res2[0].name
        orderHisObj.dishes = dishes
        // console.log(orderHisObj)
        orderHistory.push(orderHisObj)
        // console.log(orderHistory)
        res.end(JSON.stringify(orderHistory))

        kafka.make_request("cusOrders", orderHistory, function(err, results) {
          if (err) {
            console.log("Inside err");
            response.json({
              status: "error",
              msg: "System Error, Try Again."
            });
          } else {
            console.log("Inside /items else in Backend");
            response.json({
              updatedList: results
            });
      
            response.end();
          }
        })
      })

        })



    
    // let sql = `CALL get_orderHistory('${req.params.cusID}')`;
    // db.query(sql, (err, result) => {  
    //         if (err) {
    //     res.end("Error in Data");
    //   } else {
    //     res.end(JSON.stringify(result[0]));
    //   }
    // });

  });
  router.get('/orderHistoryFilter/:cusID/:filter', requireAuth, (req, res) => {
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
    events = []
    Events.find({city: req.params.location}, (error, result) => {
      if (error) {
          res.writeHead(500, {
              'Content-Type': 'text/plain'
          })
          res.end();  
      }
      else {
        // console.log(result[0].events)
          res.writeHead(200, {
              'Content-Type': 'application/json'
          });
          events.push("EVENTS_PRESENT")
          events.push(result[0].events)
          res.end(JSON.stringify(events));
      }
    // if (req.params.find === 'undefined'){
    //     req.params.find = 'null'
    // }
    // if (req.params.location === 'undefined'){
    //     req.params.location = 'null'
    // }
    // let sql = `CALL get_reqevents('${req.params.location}', '${req.params.find}');`;
    // db.query(sql, (err, result) => {
    //     if (err) {
    //         res.end("Error in Data");
    //       } else{
    //         res.end(JSON.stringify(result[0]));
    //       }
    });
  });

  router.post('/registerEvent', requireAuth, (req, res) => {
    RegisteredEvents.findByIdAndUpdate({_id: req.body.cusID}, {
      $push : {"events" : {event_id: req.body.eventid}}
    }, (err, result) => {
      if (err) {
        res.end("Error in Data");
      } else {
        res.end("REGISTERED_EVENT");
      }
    })
    // let sql = `CALL register_event('${req.body.eventid}', '${req.body.cusID}')`;
    // db.query(sql, (err, result) => {  
    //     res.end((result[0][0]).status);
    // });
  });

  router.get('/yourevents/:user_id/', requireAuth, (req, res) => {
    let sql = `CALL get_yourevents('${req.params.user_id}')`;
    db.query(sql, (err, result) => {  
            if (err) {
        res.end("Error in Data");
      } else {
        res.end(JSON.stringify(result[0]));
      }
    });
  });

  router.get('/messagesFrom/:cusID', requireAuth, (req, res) => {
    Message.find({cusID: req.params.cusID}, (err, result)=>{
      // console.log(result)
      if(result) {
        Profile.findOne({_id: result[0].resID}, (err2, res2) => {
          if(err){
            res.end("error in data")
          } 
          else {
            res.end(JSON.stringify(res2))
          }
        })
      }
    })
  });

  router.post('/replyMessage/:cusID/:resID/:name', requireAuth, (req, res) => {
    // Profile.findOne({_id: req.params.resID}, (err1, res1) => {

    // })

    Message.findOne({resID: req.params.resID, cusID: req.params.cusID}, (err, result) => {
      if(result){
        Message.findOneAndUpdate({resID: req.params.resID, cusID: req.params.cusID}, {
          $push: { messages: { msg: req.body.message,
            message_by: req.params.name}}
        }, (err2, res2) => {
          if (err2) {
            res.end("Error in Data");
          } else {
            res.end("MESSAGE_SENT");
          }
        })
      } else {
        res.end("ACTION_NOT_POSSIBLE")

      }
      kafka.make_request("messages", "MESSAGE_SENT", function(err, results) {
        if (err) {
          console.log("Inside err");
          response.json({
            status: "error",
            msg: "System Error, Try Again."
          });
        } else {
          console.log("Inside /items else in Backend");
          response.json({
            updatedList: results
          });
    
          response.end();
        }
      })
    })
  })

module.exports = router;