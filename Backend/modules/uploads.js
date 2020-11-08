const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db.js');
const CustomerProfile = require('../models/CustomerProfileModel')

const userstorage = multer.diskStorage({
    destination: path.join(__dirname, '..') + '/public/uploads/users',
    filename: (req, file, cb) => {
        cb(null, 'user' + req.params.user_id + "-" + Date.now() + path.extname(file.originalname));
    }
});

const useruploads = multer({
    storage: userstorage,
    limits: { fileSize: 1000000 },
}).single("image");

router.post("/user/:user_id", (req, res) => {
    // console.log(req.file.filename)
    useruploads(req, res, function (err) {
        if (!err) {
            CustomerProfile.findOneAndUpdate({_id: req.params.user_id}, { $set: {
                image: {img: req.file.filename}
            }}, (err2, res3) => {
                if(!err2) {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end(req.file.filename);
            }
            }
            )
            // let imageSql = `UPDATE customerProfile SET image = '${req.file.filename}' WHERE cus_id = ${req.params.user_id}`;
            // db.query(imageSql, (err, result) => {
            //     if (err) {
            //         res.writeHead(500, {
            //             'Content-Type': 'text/plain'
            //         });
            //         res.end("Database Error");
            //     }
            // });

        }
        else {
            console.log('Error!');
        }
    })
});

const resstorage = multer.diskStorage({
    destination: path.join(__dirname, '..') + '/public/uploads/restaurants',
    filename: (req, file, cb) => {
        cb(null, 'restaurant' + req.params.user_id + "-" + Date.now() + path.extname(file.originalname));
    }
});

const resuploads = multer({
    storage: resstorage,
    limits: { fileSize: 1000000 },
}).single("image");

router.post("/restaurant/:user_id", (req, res) => {
    resuploads(req, res, function (err) {
        if (!err) {
            let imageSql = `UPDATE restaurantProfile SET image = '${req.file.filename}' WHERE idrestaurant = ${req.params.user_id}`;
            db.query(imageSql, (err, result) => {
                if (err) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    res.end("Database Error");
                }
            });
            res.writeHead(200, {
                'Context-Type': 'text/plain'
            });
            res.end(req.file.filename);
        }
        else {
            console.log('Error!');
        }
    })
});

const itemstorage = multer.diskStorage({
    destination: path.join(__dirname, '..') + '/public/uploads/items',
    filename: (req, file, cb) => {
        cb(null, 'item' + req.params.dishID + "-" + Date.now() + path.extname(file.originalname));
    }
});

const itemuploads = multer({
    storage: itemstorage,
    limits: { fileSize: 1000000 },
}).single("image");

router.post("/items/:dishID", (req, res) => {
    itemuploads(req, res, function (err) {
        if (!err) {
            // if (req.params.dishID !== "null") {
            //     let imageSql = `UPDATE resDishes SET item_image = '${req.file.filename}' WHERE item_id = ${req.params.dishID}`;

            //     db.query(imageSql, (err, result) => {
            //         if (err) {
            //             res.writeHead(500, {
            //                 'Content-Type': 'text/plain'
            //             });
            //             res.end("Database Error");
            //         }
            //     });
            // }
            res.writeHead(200, {
                'Context-Type': 'text/plain'
            });
            res.end(req.file.filename);
        }
        else {
            console.log(err);
        }
    })
});


module.exports = router;