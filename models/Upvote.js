var mongoose = require('mongoose');

const {Schema} = mongoose;

mongoose.Promise = global.Promise;

const UpvoteSchema = new Schema({

    amount : Number,
    createdAt:{ type: Date, default: Date.now},
    _creator: {type: Schema.ObjectId, ref: 'User'},
    _post :  {type: Schema.ObjectId, ref: 'Post'},

});




const Upvote = mongoose.model('Upvote', UpvoteSchema);
module.exports = Upvote;