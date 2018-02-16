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

    comment.save().then(newComment =>{
        if(newComment){

            db.Post.findByIdAndUpdate(
                postId, 
                {$push: {'_comments' : newComment._id}}
            ).then(function(existingPost){
               
                return res.status(200).json({
                    success:true,
                    data:newComment,existingPost
                });
    
            }).catch(function(err){
                return res.status(500).json({
                message: err.toString(),
                });
            });
    
            db.User.findByIdAndUpdate(
                userId, 
                {$push: {'_comments' : newComment._id}}
            ).then(function(existingUser){
               
                return res.status(200).json({
                    success:true,
                    data:newComment,existingUser
                });
    
            }).catch((err) =>{
                return res.status(500).json({
                message: err.toString(),
                });
            });

        }
        
         return res.status(200).json({
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