var db = require('./../models');


const topicController = {};

topicController.getTopics = (req, res) => {
    db.Topic.find({},'title description',function(err, topics){
        if(err){
            return res.status(500).json({
                success: false,
                error: err,
            });
        }

        if(rooms){
            return res.status(200).json({
                success: true,
                rooms: topics,
            });

        }
    });
    
}


topicController.getTopic = (req, res) => {

    db.Topic.findOne({ _id: req.params.id }).then((topic) => {

        return res.status(200).json({
            success: true,
            room: topic,
        });


    }).catch((err) => {
        return res.status(200).json({
            success: false,
            errors: err,
        });

    });


}


topicController.postTopic = (req, res) => {

    const {
        name,
        description,
    } = req.body;



    const topic = new db.Topic({
        name,
        description,

    });

    topic.save().then(function (newTopic) {
        return res.status(200).json({
            success: true,
            data: newTopic,
        });
    }).catch(function (err) {
        return res.status(500).json({
            message: err,
        });
    });
}


module.exports = topicController;