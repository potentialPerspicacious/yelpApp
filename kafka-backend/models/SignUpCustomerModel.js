const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CustomerSignUp = new Schema({
    type: {type: String, required:true},
    fname: {type: String, required:true},
    lname: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    zipcode: {type: String, required:true},
    month: {type: String, required:true},
    date: {type: String, required:true},
    year: {type: String, required:true}
},
{
    versionKey: false
});
const CustomerProfileSignUpModel = mongoose.model('customerSignup', CustomerSignUp, 'customer');
module.exports = CustomerProfileSignUpModel;