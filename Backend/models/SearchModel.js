const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var restaurant = new Schema({
    name: {type: String, required:true},
    city: {type: String, required:true},
    email: {type: String, required:true},
},
{
    versionKey: false
});
var search1Name = new Schema({
    restaurants: [restaurant]
},
{
    versionKey: false
});
var search2Location = new Schema({
    // city: {type: String, required: true},
    restaurants: [restaurant]
},
{
    versionKey: false
});
var search3NameLocation = new Schema({
    restaurants: [restaurant]

},
{
    versionKey: false
});

const searchModel1 = mongoose.model('search1', search1Name, 'restaurant')
const searchModel2 = mongoose.model('search2', search2Location, 'restaurant')
const searchModel3 = mongoose.model('search3', search3NameLocation, 'restaurant')
module.exports = {
    searchByName: searchModel1,
    searchByLocation: searchModel2,
    searchByNameAndLocation: searchModel3

}