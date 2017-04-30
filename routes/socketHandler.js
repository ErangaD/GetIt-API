var Conversation = require('../model/Conversation');
var authenticate = require('../middlewares/authentication');
module.exports.listen=function(http){
    var onlineUsers = {};
    var io = require('socket.io')(http);
    io.on('connection', function(socket){
        socket.on('getMessage',function (data,callback) {
            if(data.userName){
                authenticate(data,'',function (data) {
                    if(data.currentUser){
                        //console.log(data.currentUser);
                        socket.userName=data.currentUser.userName;
                        onlineUsers[socket.userName]=socket;
                        if(data.currentUser.userType){
                            Conversation.getMessages(data.userName,data.currentUser.userName,function (err, messages) {
                                console.log('find');
                                if(!err){
                                    callback(messages);
                                }else{
                                    console.log(err);
                                }
                            })
                        }else{
                            Conversation.getMessages(data.currentUser.userName,data.userName,function (err, messages) {
                                console.log('find');
                                if(!err){
                                    callback(messages);
                                }else{
                                    console.log(err);
                                }
                            })
                        }
                    }else{
                        //emit a different message
                    }
                })
            }else{
                //there is no other on selected
            }
        });
        socket.on('send',function(data){
            //have to check that authentication works
            authenticate(data,'',function (data) {
                if(data.userName){
                    //there is a receiver
                    if(data.currentUser){
                        //console.log(data.currentUser);
                        //generate the message
                        //add data to the database
                        //find the user from data.userName if online send data

                        //create a message object here
                        if(data.currentUser.userType){
                            //sender is a seller (sender)
                            //add data to database

                        }else{
                            //sender is buyer
                            //add data to the database
                        }
                        if(data.userName in onlineUsers){
                            onlineUsers[data.userName].emit('message',{/*created message*/});
                        }
                    }else{
                        //emit a different message
                    }
                }
            })
        });
        socket.on('disconnect',function(data){
            delete onlineUsers[socket.userName];
            //removing the user when he is deisconnected
        })
    });
}