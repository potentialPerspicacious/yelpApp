const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var event = new Schema({
    event_name: {type: String, required:true},
    month: {type: String, required:true},
    date: {type: String, required:true},
    description: {type: String, required:true},
    year: {type: String, required:true},
    time: {type: String, required:true},
    location: {type: String, required:true},
    hashtags: {type: String, required:true}
})

var Events = new Schema({ events: [event]
},
{
    versionKey: false
});
const EventModel = mongoose.model('events', Events, 'restaurant');
module.exports = EventModel;