var mongoose = require('mongoose');

const {Schema} = mongoose;

mongoose.Promise = global.Promise;

const roomSchema = new Schema({
    title : { type : String, required: true},
    description : String,
    _messages: [{type: Schema.ObjectId, ref: 'Message'}],
    
});


const autoPopulateMessages = function(){
    this.populate({
        path: '_messages',
    });
    
};


roomSchema.pre('find', autoPopulateMessages)
roomSchema.pre('findOne', autoPopulateMessages)


const Room = mongoose.model('Room', roomSchema);
module.exports = Room;