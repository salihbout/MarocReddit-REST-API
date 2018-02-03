var mongoose = require('mongoose');

const {Schema} = mongoose;

mongoose.Promise = global.Promise;

const UpvoteSchema = new Schema({

    _creator: {type: Schema.ObjectId, ref: 'User'},
    _post : {type: Schema.ObjectId, ref:'Post'},
    _comment : {type: Schema.ObjectId, ref:'Comment'},
    amount : Number,
    createdAt:{ type: Date, default: Date.now},

});


const autoPopulateUpvoterAndPost = function(next){
    this.populate({
        path: '_creator',
        select : '_id '
    });
    this.populate({
        path: '_post',
        select : '_id '
    });

    next();
};

UpvoteSchema.pre('find',autoPopulateUpvoterAndPost );

const Upvote = mongoose.model('Upvote', UpvoteSchema);
module.exports = Upvote;