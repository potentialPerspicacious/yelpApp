var Menu = require("../models/MenuModel");

function handle_request(msg, callback) {
  Menu.find({
    _id: msg.user_id
  }).then(
    function(data, err) {
      if (data) {
        console.log("Data for Restaurant Menu: ", data);
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