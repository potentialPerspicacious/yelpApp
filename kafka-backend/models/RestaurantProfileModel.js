const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var profileSchema = new Schema({
    location: {type: String, required:true},
    contact: {type: String, required:true},
    cusine: {type: String, required:true},
    description: {type: String, required:true},
    timings: {type: String, required:true},
    dinein: {type: String, required:true},
    takeout: {type: String, required:true},
    ydelivery: {type: String, required:true}
},
{
    versionKey: false
});

var restaurantProfile = new Schema({
    _id: {type: Schema.ObjectId, required: true},
    name: {type: String, required:true},
    zipcode: {type: String, required:true},
    email: {type: String, required:true},
    city: {type: String, required:true},
    profileInfo: profileSchema
    
},
{
    versionKey: false
});

const profileModel = mongoose.model('profile', restaurantProfile, 'restaurant');
module.exports = profileModel;