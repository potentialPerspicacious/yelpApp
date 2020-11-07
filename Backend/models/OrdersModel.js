const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var dish = new Schema({
    dishID: {type: String, required:true},
    quantity: {type: Number, required:true}
},
    {
        versionKey: false
    });

var Orders = new Schema({ resID: {type: String, required:true},
    cusID: {type: String, required:true},
    orderPlaced: {type: String, default:"NO"},
    orderstatus: {type: String},
    ordermode: {type: String},
     dishes: [dish]
},
{
    versionKey: false
});
const OrdersModel = mongoose.model('ordersModel', Orders, 'orders');
module.exports = OrdersModel;