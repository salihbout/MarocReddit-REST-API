var db  = require('./../models');


const messageController = {};

messageController.getMessage = (req,res) => {

    db.Message.findById(req.params.id).then((message) => {
        return res.status(200).json({
            success:true,
            data:message,
        });
    }).catch( function(err){
        return res.status(500).json({
            error:err,
        });
    });
          
}


messageController.postMessage = (req, res) => {

    const {
        text, 
        userId,
        roomId
    } = req.body;



    const message = new db.Message({
        text, 
        _creator : userId,
       _room : roomId,
        
    });

    message.save().then((newMessage) => {
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