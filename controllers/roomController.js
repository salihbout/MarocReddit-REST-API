var db = require('./../models');


const roomController = {};

roomController.getRooms = (req, res) => {
    db.Room.find({},'title description',function(err, rooms){
        if(err){
            return res.status(500).json({
                success: false,
                error: err,
            });
        }

        if(rooms){
            return res.status(200).json({
                success: true,
                rooms: rooms,
            });

        }
    });
    
}


roomController.getRoom = (req, res) => {

    db.Room.findOne({ _id: req.params.id }).then((room) => {

        return res.status(200).json({
            success: true,
            room: room,
        });


    }).catch((err) => {
        return res.status(200).json({
            success: false,
            errors: err,
        });

    });


}


roomController.getRoomMessages = (req, res) => {

    db.Message.find({ _room: req.params.id }).then((messages) => {

        return res.status(200).json({
            success: true,
            messages,
        });


    }).catch((err) => {
        return res.status(200).json({
            success: false,
            errors: err,
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

    room.save().then(function (newRoom) {
        return res.status(200).json({
            success: true,
            data: newRoom,
        });
    }).catch(function (err) {
        return res.status(500).json({
            message: err,
        });
    });
}


module.exports = roomController;