const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var message = new Schema({
    msg: {type: String, required:true},
    message_by: {type: String, required:true}
},
    {
        versionKey: false
    });

var Message = new Schema({ resID: {type: String, required:true},
    cusID: {type: String, required:true},
     messages: [message]
},
{
    versionKey: false
});
const MessagesModel = mongoose.model('messagesModel', Message, 'messages');
module.exports = MessagesModel;