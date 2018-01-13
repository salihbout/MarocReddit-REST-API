var mongoose = require('mongoose');

const {Schema} = mongoose;

mongoose.Promise = global.Promise;

const postSchema = new Schema({
    title : { type : String, required: true},
    link : String,
    text: String,
    isDeleted:{type: Boolean, default: false},
    createdAt:{ type: Date, default: Date.now},
    _creator: {type: Schema.ObjectId, ref: 'User'},
    _comments : [{type: Schema.ObjectId, ref:'Comment'}],
    _upvotes : [{type: Schema.ObjectId, ref:'Upvote'}],
});


const autoPopulateCreatorAndComments = function(next){
    this.populate({
        path: '_creator',
        select : 'username createdAt -_id'
    });
    this.populate({
        path: '_comments',
        select : 'text createdAt _creator',
        match : { 'isDeleted' : false}
    });
    this.populate({
        path: '_upvote',
    });

    next();

};

postSchema.pre('find',autoPopulateCreatorAndComments);


const Post = mongoose.model('Post', postSchema);
module.exports = Post;