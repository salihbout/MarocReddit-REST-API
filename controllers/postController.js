var db  = require('./../models');


const postController = {};

postController.post = function(req, res){

    const {
        title, 
        link,
        text,
       userId,
    } = req.body;

    //Validation link or text not both

    const post = new db.Post({
        title, 
        text,
        link,
       _creator : userId,
    });

    post.save().then(function(newPost){
        return res.status(200).json({
            success:true,
            Postdata:newPost,
        });
    }).catch( function(err){
        return res.status(500).json({
            message:err,
        });
    });
}


postController.getAll = function(req,res){
    db.Post.find({}).then(function(posts){
        return res.status(200).json({
            success:true,
            posts:posts,
        });
    }).catch( function(err){
        return res.status(500).json({
            message:err,
        });
    });
}

postController.getPost = function(req,res){

    db.Post.findById(req.params.id).then(function(post){
        return res.status(200).json({
            success:true,
            post:post,
        });
    }).catch( function(err){
        return res.status(500).json({
            message:err,
        });
    });
          
}

/* postController.UpvotePost = function(req,res){
    
        db.Post.find(req.params.id, function(post){
            return res.status(200).json({
                success:true,
                data:post,
              });
            }).catch( function(err){
                return res.status(500).json({
                    message:err,
                });
            });
              
    } */


postController.getPostUpvotes = function(req,res){
    
    db.Upvote.find({ _post: req.params.id }).then((upvotes) => {

        return res.status(200).json({
            success: true,
            upvotes,
        });


    }).catch((err) => {
        return res.status(200).json({
            success: false,
            errors: err,
        });

    });
              
    }
module.exports = postController;