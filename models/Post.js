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
    _upvotes : [{type: Schema.ObjectId, ref:'Upvote'}]

});


const autoPopulateCreatorAndComments = function ()  {
    this.populate({
        path: '_creator',
        select : 'username  _id'
    });
    this.populate({
        path: '_upvotes'
        
    });
    this.populate({
        path: '_comments',
        select : 'text createdAt',
        match : { 'isDeleted' : false}
    });
    

};

postSchema.pre('find',autoPopulateCreatorAndComments);
postSchema.pre('findOne',autoPopulateCreatorAndComments);



const Post = mongoose.model('Post', postSchema);
module.exports = Post;