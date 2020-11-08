const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var imageSchema = new Schema({
    image: {type: String, required: true},
},
{
    versionKey: false
});

const cusImg = mongoose.model('cusImage', imageSchema, 'customer');
const resImg = mongoose.model('resImage', imageSchema, 'restaurant');
module.exports = {
    resImage: resImg,
    cusImage: cusImg
}