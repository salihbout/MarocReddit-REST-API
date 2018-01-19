var db  = require('./../models');

const commentController = {};

commentController.post = function(req, res){
    const {
        text,
        userId,
        postId,
    } = req.body;
    console.log(req.body);

    const comment = new db.Comment({
        text, 
       _creator : userId,
       _post : postId,
    }); 

    comment.save().then(function(newComment){

        db.Post.findByIdAndUpdate(
            postId, 
            {$push: {'_comments' : newComment._id}}
        ).populate('_comments._creator').then(function(existingPost){
            console.log("newComment");
            console.log(newComment);
            console.log(existingPost);
            res.status(200).json({
                success:true,
                data:newComment,existingPost
            });
        }).catch(function(err){
            res.status(500).json({
            message: err.toString(),
            });
        });
        res.status(200).json({
            success:true,
            data:newComment,
        });
    }).catch( function(err){
        res.status(500).json({
            message: err.toString(),
        });
    });
}


module.exports = commentController;