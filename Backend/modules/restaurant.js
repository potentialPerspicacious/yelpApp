const express = require("express");
const router = express.Router();
const db = require('../db.js');
var kafka = require("../kafka/client");


// router.post('/editProfile/:user_id', (req, res) => {
//     let sql = `CALL Restaurant_Update_BasicProfile('${req.params.user_id}', '${req.body.rname}', '${req.body.email}', '${req.body.zipcode}', '${req.body.location}', '${req.body.contact}', '${req.body.cusine}', '${req.body.description}', '${req.body.timings}', '${req.body.dinein}', '${req.body.takeout}', '${req.body.ydelivery}');`;
//     db.query(sql, (err, result) => {
//       if (err) {
//         res.end("Error in Data");
//       }
//       if (result && result.length > 0 && result[0][0].status === 'USER_UPDATED') {
//         res.end(result[0][0].status);
//       }
//     });
//   });

const Profile = require('../Models/RestaurantProfileModel.js');
const Orders = require('../models/OrdersModel.js');
const CustomerProfile = require('../models/CustomerProfileModel');
const Events = require('../models/EventsModel')
const Reviews = require('../models/ReviewModel')
const Message = require('../models/MessageModel')
const { response } = require("express");



router.post('/editProfile/:user_id', (req, res) => {
  Profile.findByIdAndUpdate(req.params.user_id, {
    name: req.body.rname,
    email: req.body.email,
    zipcode: req.body.zipcode,
    city: req.body.city,
    profileInfo: {location:req.body.location,
    contact:req.body.contact,
    cusine:req.body.cusine,
    description:req.body.description,
    timings:req.body.timings,
    dinein:req.body.dinein,
    takeout:req.body.takeout,
    ydelivery:req.body.ydelivery
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
  router.get('/orderHistory/:resID', (req, res) => {
    var orderHistory = []
    var orderHisObj = {}
    var dishes = []
    Orders.find({resID: req.params.resID, orderPlaced:"YES"}, (err, result)=>{
      // console.log(result[0]._doc)
      if (result.length > 0){
        orderHistory.push("ITEM_PRESENT")

      } else {
        orderHistory.push("ITEM_NOT_PRESENT")
      }
      orderHisObj.idorderhistory = result[0]._id,
      orderHisObj.cusID = result[0]._doc.cusID,
      orderHisObj.ordertype = (result[0].ordermode),
      orderHisObj.orderstatus = result[0].orderstatus
      Profile.find({_id: req.params.resID}, (err2, res2) => {
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
        orderHisObj.dishes = dishes
        CustomerProfile.find({_id: result[0]._doc.cusID}, (err3, res3)=> {
          orderHisObj.fname = res3[0].fname
          orderHisObj.lname = res3[0].lname

          // console.log(orderHisObj)
          orderHistory.push(orderHisObj)
          // console.log(orderHistory)
          res.end(JSON.stringify(orderHistory))
        })
        // console.log(dishes)
      })
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

    // let sql = `CALL get_RorderHistory('${req.params.resID}')`;
    // db.query(sql, (err, result) => {  
    //         if (err) {
    //     res.end("Error in Data");
    //   } else {
    //     res.end(JSON.stringify(result[0]));
    //   }
    // });
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
    Orders.findByIdAndUpdate(req.body.orderID, {
      ordermode: req.body.orderType,
      orderstatus: req.body.orderStatus
    }, (err, result) => {
      if (err) {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        })
        res.end();  
    }
    else {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end("ORDER_UPDATED");
    }
    })

    // let sql = `CALL update_orders('${req.params.user_id}', '${req.body.orderID}', '${req.body.orderStatus}', '${req.body.orderType}');`;
    // db.query(sql, (err, result) => {
    //   if (err) {
    //     res.end("Error in Data");
    //   }
    //   if (result && result.length > 0 && result[0][0].status === 'ORDER_UPDATED') {
    //     res.end(result[0][0].status);
    //   }
    // });
  });
  router.post('/review/:user_id/:resID', (req, res) => {
    Reviews.update({_id: req.params.resID}, { $push : { 'reviews': {
      review_description: req.body.reviews,
      rating: req.body.rating, 
      review_by: req.params.user_id
    }}}, (err , results) => {
      if (err) {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        })
        res.end();  
    }
    else {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end("REVIEW_ADDED");
    }
    })
    // let sql = `CALL add_review('${req.params.user_id}', '${req.params.resID}', '${req.body.reviews}', '${req.body.rating}');`;
    // db.query(sql, (err, result) => {
    //   if (err) {
    //     res.end("Error in Data");
    //   } else {
    //     res.end(result[0][0].status);
    //   }
    // });
  });
  router.get('/getReviews/:resID/', (req, res) => {
    let status = ["REVIEW_PRESENT"], outs = []
    Reviews.find({_id: req.params.resID}, (err, result) => {
      if (err) {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        })
        res.end();  
    }
    else {
      // console.log(result[0].events)
      for(i=0; i<result[0].reviews.length; i++){
        CustomerProfile.find({_id: result[0].reviews[i].review_by}, (err2, res2) => {
          // console.log(result[0].reviews[i])

          result[0].reviews[0].fname = res2[0].fname
        })
      }
      outs = status.concat(result[0].reviews)
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
       
        res.end(JSON.stringify(outs));
    }
    kafka.make_request("cusOrders", outs, function(err, results) {
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
    // let sql = `CALL get_reviews('${req.params.resID}')`;
    // db.query(sql, (err, result) => {  
    //         if (err) {
    //     res.end("Error in Data");
    //   } else {
    //     res.end(JSON.stringify(result[0]));
    //   }
    // });
  });

  router.post('/addevent/:user_id', (req, res) => {
    Events.findOne({_id: req.params.user_id, "events.event_name": req.body.eventname, "events.location":req.body.location}, (err, result) => {
      if(result) {
        res.end("EVENT_EXISTS")
      } else {
        Events.update({_id: req.params.user_id}, { $push : { 'events':  {
          event_name: req.body.eventname,
          month: req.body.month,
          date: req.body.date,
          description: req.body.description,
          year: req.body.year,
          time: req.body.time,
          location: req.body.location,
          hashtags: req.body.hashtags
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
              res.end("EVENT_ADDED");
          }
      });
      }
    })

    // let sql = `CALL add_event('${req.params.user_id}', '${req.body.eventname}', '${req.body.description}', '${req.body.month}', '${req.body.date}', '${req.body.year}', '${req.body.time}', '${req.body.location}', '${req.body.hashtags}');`;
    // db.query(sql, (err, result) => {
    //   if (err) {
    //     res.end("Error in Data");
    //   } else {
    //     res.end(result[0][0].status);
    //   }
    // });
  });
  router.get('/getEvents/:resID/', (req, res) => {
    Events.find({_id: req.params.resID}, (error, result) => {
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
          res.end(JSON.stringify(result[0].events));
      }
      kafka.make_request("cusOrders", result[0].events, function(err, results) {
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
    // let sql = `CALL get_events('${req.params.resID}')`;
    // db.query(sql, (err, result) => {  
    //         if (err) {
    //     res.end("Error in Data");
    //   } else {
    //     res.end(JSON.stringify(result[0]));
    //   }
    // });
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


  router.post('/sendMessage/:resID/:cusID/:name', (req, res) => {
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
        Message.insertMany({
          resID: req.params.resID, 
          cusID: req.params.cusID}, (err4, res4) => {
            if(err4) {
              res.end("Error in Data");
            } else {
              Message.update({resID: req.params.resID, cusID: req.params.cusID}, {
              $push: { messages: { msg: req.body.message,
              message_by: req.params.name}}}, (err3, res3) => {
              if (err3) {
                res.end("Error in Data");
              } else {
                res.end("MESSAGE_SENT");
              }
            })

            }
          })

      }
      kafka.make_request("res2cusMessage", "MESSAGE_SENT", function(err, results) {
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