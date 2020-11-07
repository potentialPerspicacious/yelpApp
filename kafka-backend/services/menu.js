var Menu = require("../models/MenuModel");

function handle_request(msg, callback) {
  console.log("Inside List Menu Request");
  Menu.find({
    restaurant_id: msg.restaurant_id
  }).then(
    function(data, err) {
      if (data) {
        console.log("Data for Owner Menu: ", data);
        callback(null, data);
      } else {
        console.log("err->", data);
        console.log("error is", err);
      }
    },
    function(err) {
      console.log("error is", err);
    }
  );
}

exports.handle_request = handle_request;