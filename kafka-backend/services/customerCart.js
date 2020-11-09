const Orders = require('../models/OrdersModel.js');

function handle_request(msg, callback) {
  var out = []
  Orders.find({resID: msg.resID, cusID: msg.user_id, orderPlaced: "NO"}, (err1, orders) => {
    if(orders[0].dishes.length > 0){
      out.push(orders[0]._id)
      Menu.findOne({_id: req.params.resID}, (err2, dishes) => {
        for(i=0; i< orders[0].dishes.length; i++){
          for(j=0; j< dishes.dishes.length; j++){
            if(JSON.stringify(orders[0].dishes[i].dishID) === JSON.stringify(dishes.dishes[j]._id)){
              dishes.dishes[j]._doc.quantity = orders[0].dishes[i].quantity
              out.push(dishes.dishes[j])
            }
          }
        }
        // out._id = (orders[0]._id)
        // res.end(JSON.stringify(out));
      })

    }
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