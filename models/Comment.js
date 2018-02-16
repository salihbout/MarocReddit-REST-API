var mongoose = require('mongoose');

const {Schema} = mongoose;

mongoose.Promise = global.Promise;

const commentSchema = new Schema({
    text : {type : String, required: true},
    isDeleted:{type: Boolean, default: false},
    createdAt:{ type: Date, default: Date.now},
    _creator: {type: Schema.ObjectId, ref: 'User'},
    _post :  {type: Schema.ObjectId, ref: 'Post'}
});

const autoPopulateCreator = function(){
    this.populate({
        path: '_creator',
        select : 'username _id'
    });
    
};

commentSchema.pre('find',autoPopulateCreator );

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;