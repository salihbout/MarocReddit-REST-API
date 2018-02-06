var db  = require('./../models');


const messageController = {};

messageController.getMessage = function(req,res){

    db.Room.findById(req.params.id).then(function(post){
        return res.status(200).json({
            success:true,
            data:message,
        });
    }).catch( function(err){
        return res.status(500).json({
            message:err,
        });
    });
          
}


messageController.postMessage = (req, res) => {

    const {
        title, 
        userId,
        roomId
    } = req.body;



    const message = new db.Message({
        title, 
        _creator : userId,
       _room : roomId,
        
    });

    message.save().then(function(newMessage){
        return res.status(200).json({
            success:true,
            data:newMessage,
        });
    }).catch( function(err){
        return res.status(500).json({
            message:err,
        });
    });
}



module.exports = messageController;