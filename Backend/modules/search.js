const express = require("express");
const router = express.Router();
const db = require('../db.js');
const searchModel = require('../models/SearchModel');
const searchByName = searchModel.searchByName;
const searchByLocation = searchModel.searchByLocation;
const searchByNameAndLocation = searchModel.searchByNameAndLocation;

router.get('/restaurants/:find/:location/:search', (req, res) => {
  if(req.params.find === 'undefined'){
    //search by location
    searchByLocation.find({
      city: req.params.location
    }, (error, result) => {
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
        var proBasic = result[0]._doc;
        var proAdv = result[0]._doc.profileInfo;
        delete proBasic.profileInfo;
        delete proBasic.dishes;
        delete proAdv._id
        var details = Object.assign(proBasic, proAdv)
        // console.log(details)
        res.end(JSON.stringify(details));
    }
    })
  } else if (req.params.location === 'undefined'){
    searchByName.find({
      name: req.params.find
    }, (error, result) => {
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
        var proBasic = result[0]._doc;
        var proAdv = result[0]._doc.profileInfo;
        delete proBasic.profileInfo;
        delete proBasic.dishes;
        delete proAdv._id
        var details = Object.assign(proBasic, proAdv)
        console.log(details)
        res.end(JSON.stringify(details));
    }
    })  } else {
    //search by both
    searchByLocation.find({
      city: req.params.location
    }, (error, result) => {
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
        var proBasic = result[0]._doc;
        var proAdv = result[0]._doc.profileInfo;
        delete proBasic.profileInfo;
        delete proBasic.dishes;
        delete proAdv._id
        var details = Object.assign(proBasic, proAdv)
        // console.log(details)
        res.end(JSON.stringify(details));
    }
    })
  }

  //   if (req.params.find === 'undefined'){
  //       req.params.find = 'null'
  //   }
  //   if (req.params.location === 'undefined'){
  //       req.params.location = 'null'
  //   }
  //   let sql = null
  //   if (req.params.search === 'false'){
  //     sql = `CALL get_restaurants('${req.params.find}');`;

  //   } else {
  //   sql = `CALL get_restaurantsFromName('${req.params.find}');`;
  // }
  //   db.query(sql, (err, result) => {
  //       if (err) {
  //           res.end("Error in Data");
  //         } else{
  //           res.end(JSON.stringify(result[0]));
  //         }
  //   });
  });
  router.get('/restaurantsFilter/:find/:location/:filter', (req, res) => {
    if (req.params.find === 'undefined'){
        req.params.find = 'null'
    }
    if (req.params.location === 'undefined'){
        req.params.location = 'null'
    }
    let sql = `CALL get_restaurantsFilter('${req.params.location}', '${req.params.find}', '${req.params.filter}');`;
    db.query(sql, (err, result) => {
        if (err) {
            res.end("Error in Data");
          } else{
            res.end(JSON.stringify(result[0]));
          }
    });
  });

  router.get('/locations/:find/:location', (req, res) => {
    if(req.params.find === 'undefined'){
      //search by location
      searchByLocation.find({
        city: req.params.location
      }, {"profileInfo.location": 1,
    city: 1,
  zipcode: 1}, (error, result) => {
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
          var outs = {location: null};
          outs.location = result[0]._doc.profileInfo.location + " " + result[0]._doc.city + " " + result[0]._doc.zipcode;
          res.end(JSON.stringify(outs));
      }
      })
    } else if (req.params.location === 'undefined'){
      //search by name
    } else {
      //search by both
    }
  });
  router.get('/locationsFilter/:find/:location/:filter', (req, res) => {
    if (req.params.find === 'undefined'){
        req.params.find = 'null'
    }
    if (req.params.location === 'undefined'){
        req.params.location = 'null'
    }
    let sql = `CALL get_locationFilter('${req.params.location}', '${req.params.find}', '${req.params.filter}');`;
    db.query(sql, (err, result) => {
        if (err) {
            res.end("Error in Data");
          } else{
            res.end(JSON.stringify(result[0]));
          }
    });
  });

module.exports = router;