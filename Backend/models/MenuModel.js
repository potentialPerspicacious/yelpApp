const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var dish = new Schema({
    name: {type: String, required:true},
    ingredients: {type: String, required:true},
    price: {type: String, required:true},
    description: {type: String, required:true},
    category: {type: String, required:true}
})

var MenuItem = new Schema({ dishes: [dish]
},
{
    versionKey: false
});
const MenuModel = mongoose.model('menu', MenuItem, 'restaurant');
module.exports = MenuModel;
