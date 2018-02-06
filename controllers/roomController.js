var db  = require('./../models');


const roomController = {};

roomController.getRooms = function(req,res){
    db.Room.find({}).then(function(rooms){
        return res.status(200).json({
            success:true,
            posts:rooms,
        });
    }).catch( function(err){
        return res.status(500).json({
            message:err,
        });
    });
}


roomController.getRoom = function(req,res){

    db.Post.findById(req.params.id).then(function(room){
        return res.status(200).json({
            success:true,
            post:room,
        });
    }).catch( function(err){
        return res.status(500).json({
            message:err,
        });
    });
          
}


roomController.postRoom = (req, res) => {

    const {
        title, 
        description,
    } = req.body;

    

    const room = new db.Room({
        title, 
        description,
        
    });

    room.save().then(function(newRoom){
        return res.status(200).json({
            success:true,
            data:newRoom,
        });
    }).catch( function(err){
        return res.status(500).json({
            message:err,
        });
    });
}


module.exports = roomController;