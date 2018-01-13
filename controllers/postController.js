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
            Userdata:req.user,
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
            data:posts,
        });
    }).catch( function(err){
        return res.status(500).json({
            message:err,
        });
    });
}

postController.getPost = function(req,res){

    db.Post.findOne({ _id: req.params.id}, function(post){
        return res.status(200).json({
            success:true,
            data:post,
          });
        }).catch( function(err){
            return res.status(500).json({
                message:err,
            });
        });
          
}

postController.UpvotePost = function(req,res){
    
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
              
    }

module.exports = postController;