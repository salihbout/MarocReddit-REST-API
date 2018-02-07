var db  = require('./../models');


const roomController = {};

roomController.getRooms = (req,res) => {
    db.Room.find({}).select('title description').then(function(rooms){
        return res.status(200).json({
            success:true,
            rooms:rooms,
        });
    }).catch( function(err){
        return res.status(500).json({
            message:err,
        });
    });
}


roomController.getRoom = (req,res) => {

    db.Room.findById(req.params.id).populate('_messages').exec(function(err, room){
        if(err){

            return res.status(500).json({
            message:err,
        });

        }else{

            return res.status(200).json({
            success:true,
            room:room,
        });

        }
        
          
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