var Order = require("../models/OrdersModel");

function handle_request(msg, callback) {
  Order.find({
    _id: msg.cusID
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