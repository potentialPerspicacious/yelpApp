var connection = new require("./kafka/Connection");
var menu = require("./services/menu");
var cart = require("./services/customerCart");
var cusOrderHis = require('./services/orderHistoryCustomer')
var restaurantOrders = require('./services/restaurantOrders')
var cus2resMessages = require('./services/cus2resMessages')
var res2cusMessages = require('./services/res2cusMessages')
var messageRead = require('./services/messages')
var addEvents = require('./services/addEvents')
var registerEvent = require('./services/registerEvent')
var search = require('./services/search')
var placeOrder = require('./services/placeOrder')


function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log("server is running ");
    consumer.on("message", function(message) {
      console.log("message received for " + topic_name + " ", fname);
      console.log(JSON.stringify(message.value));
      var data = JSON.parse(message.value);
  
      fname.handle_request(data.data, function(err, res) {
        console.log("after handle" + res);
        var payloads = [
          {
            topic: data.replyTo,
            messages: JSON.stringify({
              correlationId: data.correlationId,
              data: res
            }),
            partition: 0
          }
        ];
        producer.send(payloads, function(err, data) {
          console.log(data);
        });
        return;
      });
    });
  }

  handleTopicRequest("menu", menu);
  handleTopicRequest("cart", cart);
  handleTopicRequest("cusOrders", cusOrderHis);
  handleTopicRequest("resOrders", restaurantOrders);
  handleTopicRequest("res2cusMsg", res2cusMessages);
  handleTopicRequest("cus2resMsg", cus2resMessages);  
  handleTopicRequest("messages", messageRead);
  handleTopicRequest("addEvents", addEvents);
  handleTopicRequest("registerEvents", registerEvent);
  handleTopicRequest("search", search);
  handleTopicRequest("placeOrder", placeOrder);


  





