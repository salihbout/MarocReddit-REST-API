

const basicController = {};

basicController.get = function(req, res){
    res.json({
        message : 'Welcome to ourqsdqsd API'
    });
};
module.exports = basicController;