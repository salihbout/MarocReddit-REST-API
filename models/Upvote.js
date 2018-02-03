var mongoose = require('mongoose');

const {Schema} = mongoose;

mongoose.Promise = global.Promise;

const UpvoteSchema = new Schema({

    _creator: {type: Schema.ObjectId, ref: 'User'},
    _post : {type: Schema.ObjectId, ref:'Post'},
    amount : Number,
    createdAt:{ type: Date, default: Date.now},

});




const Upvote = mongoose.model('Upvote', UpvoteSchema);
module.exports = Upvote;