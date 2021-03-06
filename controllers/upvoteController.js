var db = require('./../models');


const upvoteController = {};

upvoteController.upvotePost = function (req, res) {

    const {
        userId,
        postId,
        comment,
        amount,
    } = req.body;

    const NewUpvote = new db.Upvote({

        _creator: userId,
        _post: postId,
        _comment: comment,
        amount: amount,


    });

    let query = { _post: postId, _creator: userId }

    db.Upvote.findOneAndUpdate(query, { _post: postId, _creator: userId, amount: amount }, { upsert: true }, (err, upvote) => {

        if (upvote) {

            db.Post.findOneAndUpdate(
                { _id: postId }, { $addToSet: { '_upvotes': upvote._id } }).then(post => {

                    return res.status(500).json({
                        success: true,
                        post: post,
                    });

                }).catch(err => {
                    return res.status(500).json({
                        success: false,
                        post: err,
                    });
                });


            db.User.findByIdAndUpdate(
                userId,
                { $push: { '_upvotes': upvote._id } }
            ).then(function (existingUser) {

                return res.status(200).json({
                    success: true,
                    data: upvote, existingUser
                });

            }).catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: err
                });
            });

        }

        if (err) {
            return res.status(500).json({
                success: false,
                message: err
            });
        }






    });

    /*     NewUpvote.save().then(function(newUpvote){
    
            db.Post.findByIdAndUpdate(
                postId, 
                {$push: {'_upvotes' : newUpvote._id}}
    
            ).catch(function(err){
                 return res.status(500).json({
                message: err,
                });
            });
            
    
            return res.status(200).json({
                success:true,
                data:newUpvote,
            });
    
        }).catch( function(err){
            return res.status(500).json({
                message:err,
            });
        }); */


}


upvoteController.getUpvote = (req, res) => {

    db.Upvote.findById(req.params.id).then(function (upvote) {
        return res.status(200).json({
            success: true,
            data: upvote,
        });
    }).catch(function (err) {
        return res.status(500).json({
            success: false,
            error: err,
        });
    });
}



upvoteController.getUpvotes = (req, res) => {
    db.Upvote.find({}).then(function (upvotes) {
        return res.status(200).json({
            success: true,
            upvotes: upvotes,
        });
    }).catch(function (err) {
        return res.status(500).json({
            success: false,
            error: err,
        });
    });
}

module.exports = upvoteController;