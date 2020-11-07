const express = require("express");
const router = express.Router();
const CustomerProfile = require('../models/CustomerProfileModel')
const Profile = require('../Models/RestaurantProfileModel.js');
const Message = require('../models/MessageModel')

router.get('/getMessages/:cusID/:resID', (req, res) => {
    var messages = []
    var temp
    var msgObj = {}
    Message.findOne({resID: req.params.resID, cusID: req.params.cusID}, (err, result) => {
        // console.log(result.messages[0].msg)
        if (err) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end();  
        }
        else {
            temp = result

        } 
        messages.push("MESSAGE_PRESENT")
        for (i = 0; i <temp.messages.length; i++){
        let j = i;
        Profile.findOne({_id: temp.messages[i].message_by}, (err2, res2) => {
            if(res2) {
                msgObj.message = temp.messages[j].msg
                msgObj.message_by = res2.name
                messages.push(msgObj)
                console.log(messages)

            } else {
                    CustomerProfile.findOne({_id: result.messages[i].message_by}, (err3, res3) => {
                    // console.log(res3.fname)
                    msgObj.message_by = res3.fname
                messages.push(msgObj)
                console.log(messages)
                                    })
                    }
                })
            }
            console.log(messages)
            res.writeHead(200, {
                'Content-Type': 'application/json'
                
            });
            res.end(JSON.stringify(messages));   
            
        }
    )
})

module.exports = router;