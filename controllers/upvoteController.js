var db  = require('./../models');


const upvoteController = {};

upvoteController.upvotePost = function(req, res){

    const {
        userId,
        postId,
        comment,
        amount, 
    } = req.body;

    const NewUpvote = new db.Upvote({
        
       _creator : userId,
       _post : postId,
       _comment : comment,
       amount : amount,

       
    }); 

    NewUpvote.save().then(function(newUpvote){
        return res.status(200).json({
            success:true,
            Postdata:newUpvote,
        });
    }).catch( function(err){
        return res.status(500).json({
            message:err,
        });
    });


}


module.exports = upvoteController;