const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var event = new Schema({
    event_id: {type: String, required:true}
})

var RegEvents = new Schema({ events: [event]
},
{
    versionKey: false
});
const RegisteredEvents = mongoose.model('registerEvents', RegEvents, 'customer');
module.exports = RegisteredEvents;