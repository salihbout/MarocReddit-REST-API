var mongoose = require('mongoose');

const {Schema} = mongoose;

mongoose.Promise = global.Promise;

const topicSchema = new Schema({
    name : { type : String, required: true},
    description : String,
    _postss : [{type: Schema.ObjectId, ref:'Post'}]

});


const autoPopulatePosts = function ()  {
    this.populate({
        path: '_postss',
    });  
};

topicSchema.pre('find',autoPopulatePosts);
topicSchema.pre('findOne',autoPopulatePosts);



const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;