const Events = require('../models/EventsModel');

function handle_request(msg, callback) {
  var out = []
  Events.find({
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