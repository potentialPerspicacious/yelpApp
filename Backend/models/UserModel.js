const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var usersSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
},
{
    versionKey: false
});

const userModel = mongoose.model('user1', usersSchema, 'restaurant');
const userModel2 = mongoose.model('user2', usersSchema, 'customer');
module.exports = {
    restaurant: userModel,
    customer: userModel2
}