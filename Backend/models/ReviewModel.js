const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var review = new Schema({
    review_description: {type: String, required:true},
    rating: {type: String, required:true},
    review_by: {type: String, required:true}
})

var Review = new Schema({ reviews: [review]
},
{
    versionKey: false
});
const ReviewModel = mongoose.model('review', Review, 'restaurant');
module.exports = ReviewModel;
