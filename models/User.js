var mongoose = require('mongoose');
var bcrypt = require("bcrypt");

const {Schema} = mongoose;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
    username : {
        type : String,
        required: true,
        index: {unique: true},
        minLength : [5, " Username must be 5 characters or more"],
    },
    password : {
        type : String,
        required : true,
        minLength : [8,"Password must be 8 characters or more"]
    },
    email : {
        type : String,
        required : true,
    },
    isSubscribed :{type: Boolean, default: false},
    isDeleted:{type: Boolean, default: false},
    createdAt:{ type: Date, default: Date.now},

    _postss: [{type: Schema.ObjectId, ref: 'Post'}],
    _comments : [{type: Schema.ObjectId, ref:'Comment'}],
    _upvotes : [{type: Schema.ObjectId, ref:'Upvote'}]
});


// Encryption for password !
userSchema.pre('save',  function(next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};



const User = mongoose.model('User', userSchema);
module.exports = User;