var socketIo = require('socket.io');
var authenticate = require('../middlewares/authentication');
module.exports.listen=function(http){
    var io = require('socket.io')(http);
    io.on('connection', function(socket){
        socket.on('getMessage',function (data) {
            
        });
    });
}