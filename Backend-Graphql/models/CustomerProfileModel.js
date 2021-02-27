const mongoose = require('mongoose');
delete mongoose.connection.models['CustomerProfile'];
const Schema = mongoose.Schema;
var profileSchema = new Schema({
    gender: {type: String, required:true},
    headline: {type: String, required:true},
    city: {type: String, required:true},
    address: {type: String, required:true},
    contact: {type: String, required:true},
    nickname: {type: String, required:true},
    yelptime: {type: String, required:true},
    hobbies: {type: String, required:true},
    about: {type: String, required:true},
    social: {type: String, required:true},
},

{
    versionKey: false
});

var imageSchema = new Schema({
    img: {type: String, required:true}
},

{
    versionKey: false
});

var customerProfile = new Schema({
    _id: {type: Schema.ObjectId, required: true},
    fname: {type: String, required:true},
    lname: {type: String, required:true},
    zipcode: {type: String, required:true},
    email: {type: String, required:true},
    date: {type: String, required:true},
    month: {type: String, required:true},
    year: {type: String, required:true},
    profileInfo: profileSchema,
    image: imageSchema
    
},
{
    versionKey: false
});

const CustomerProfileModel = mongoose.model('CustomerProfile', customerProfile, 'customer');
module.exports = CustomerProfileModel;