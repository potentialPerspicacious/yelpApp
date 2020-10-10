const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs');


router.get('/user/:user_image', (req, res) => {
    var image = path.join(__dirname, '..') + '/public/uploads/users/' + req.params.user_image;
    if (fs.existsSync(image)) {
        res.sendFile(image);
    }
    else {
        res.sendFile(path.join(__dirname, '..') + '/public/uploads/users/userplaceholder.png')
    }
});


router.get('/restaurant/:res_image', (req, res) => {
    var image = path.join(__dirname, '..') + '/public/uploads/restaurants/' + req.params.res_image;
    if (fs.existsSync(image)) {
        res.sendFile(image);
    }
    else {
        res.sendFile(path.join(__dirname, '..') + '/public/uploads/restaurants/resplaceholder.png')
    }
});

router.get('/item/:item_image', (req, res) => {
    var image = path.join(__dirname, '..') + '/public/uploads/items/' + req.params.item_image;
    if (fs.existsSync(image)) {
        res.sendFile(image);
    }
    else {
        res.sendFile(path.join(__dirname, '..') + '/public/uploads/items/itemplaceholder.png')
    }
});

module.exports = router;