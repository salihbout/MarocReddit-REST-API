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

    message.save().then(function(newMessage){

        db.Room.findByIdAndUpdate(
            roomId, 
            {$push: {'_messages' : newMessage._id}}
        ).catch(function(err){
            return res.status(500).json({
            message: err.toString(),
            });
        });
        
        db.User.findById(newMessage._creator).then(user => {
            console.log(user)
            if(user){
                let newMessageToSend = {
                    _id : newMessage._id,
                    text : newMessage.text,
                    _creator : {
                        _id: user._id,
                        username: user.username,
                    },
                    createdAt : newMessage.createdAt
                }

                global.io.emit('newMessage',newMessageToSend)
                return res.status(200).json({
                    success:true,
                    data:newMessageToSend,
                });
            }
        }).catch(err =>{
            return res.status(200).json({
                success:false,
                err:err.toString(),
            });
        });



        
        
       
    }).catch( function(err){
        return res.status(500).json({
            message:err,
        });
    });
}



module.exports = messageController;