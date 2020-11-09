const express = require("express");
const router = express.Router();
const CustomerProfile = require('../models/CustomerProfileModel')
const Profile = require('../Models/RestaurantProfileModel.js');
const Message = require('../models/MessageModel')
var kafka = require("../kafka/client");

router.get('/getMessages/:cusID/:resID', (req, res) => {
    Message.findOne({resID: req.params.resID, cusID: req.params.cusID}, (err, result) => {
        // console.log(result)
        if (err) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end();  
        }
        else if (result){
            res.writeHead(200, {
                'Content-Type': 'application/json'
                
            })
            res.end(JSON.stringify(result.messages));   
        } else {
            res.end("NO_MESSAGES")
        } 
        kafka.make_request("messages", "MESSAGE_READ", function(err, results) {
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
        }
    )
})


module.exports = router;