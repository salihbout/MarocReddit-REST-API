var mongoose = require('mongoose');

const {Schema} = mongoose;

mongoose.Promise = global.Promise;

const messageSchema = new Schema({
    text : {type : String, required: true},
    createdAt:{ type: Date, default: Date.now},
    _creator: {type: Schema.ObjectId, ref: 'User'},
    _room :  {type: Schema.ObjectId, ref: 'Room'}
});

const autoPopulateCreator = function(next){
    this.populate({
        path: '_creator',
        select : 'username'
    });
    next();
};


messageSchema.pre('find',autoPopulateCreator);
messageSchema.pre('findOne',autoPopulateCreator);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;