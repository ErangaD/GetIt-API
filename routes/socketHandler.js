var Conversation = require('../model/Conversation');
var User = require('../model/User');
var Message = require('../model/Message');
var authenticate = require('../middlewares/authentication');


function getMessages(buyerUserName,sellerUserName,socket){
    Conversation.getMessages(buyerUserName,sellerUserName,function (err, messages) {
        if(!err){
            socket.emit('messages',messages[0]);
        }else{
            console.log(err);
        }
    });
}
function getConversation(buyerUserName,sellerUserName,socket) {
    Conversation.getConversation(buyerUserName,sellerUserName,function (err, conversation) {
        if(!err){
            //conversation object is retrieved
            var message=new Message({
                text: req.text
            });
            console.log(conversation.length);
            if(conversation.length==0){
                var cnv = new Conversation({
                    sellerUserName:userNameOfOtherParty,
                    buyerUserName:req.currentUser.userName,
                    messages:[message]
                });
                Conversation.createConversation(cnv,function (err,cnvsersation) {
                    if(err){
                        console.log(err);
                    }
                    //sending back the message
                    //console.log(cnvsersation);
                    socket.emit('ongoing',cnvsersation.messages[0]);
                });
            }
            else{
                //console.log(conversation[0].messages.length);
                conversation[0].messages.push(message);
                conversation[0].save(function (err,conversation) {
                    if(err){
                        console.log(err);
                    }else{
                        socket.emit('ongoing',message);
                    }
                });
            }
        }else{
            console.log(err);
        }
    })
}
module.exports.listen=function(http){
    var onlineUsers = {};
    var io = require('socket.io')(http);
    io.on('connection', function(socket){
        //console.log('connection');
        socket.on('getMessage',function (data) {
            //console.log(data);
            //request can be come without specifying the userId then has to give the last active conversation
            if(data.userId){
                //console.log('In user Id');
                authenticate(data,'',function (req) {
                    console.log(req);
                    socket.userName=req.currentUser.userName;
                    onlineUsers[socket.userName]=socket;
                    //console.log(data.currentUser);
                    if(data.currentUser){
                        var userNameOfOtherParty;
                        User.getUserById(data.userId,function (err,user) {
                            if(err){
                                //sending a error message that use does not exists
                                console.log(err);
                            }else{
                                //console.log(user);
                                userNameOfOtherParty=user.userName;
                                if(req.currentUser.userType){
                                    getMessages(userNameOfOtherParty,req.currentUser.userName,socket);
                                }else{
                                    getMessages(req.currentUser.userName,userNameOfOtherParty,socket);
                                }
                            }
                        });
                        //console.log(data.currentUser);

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
            //console.log(data);
            authenticate(data,'',function (req) {
                //console.log(req);
                if(req.userId){
                    //there is a receiver
                    if(req.currentUser){
                        //current user has been retrieved from the database
                        var userNameOfOtherParty;
                        User.getUserById(req.userId,function (err,user) {
                            if(err){
                                //sending a error message that use does not exists
                                console.log(err);
                            }else{
                                //console.log(user);
                                userNameOfOtherParty=user.userName;
                                if(req.currentUser.userType){
                                    //sender is a seller (sender)
                                    //add data to database
                                    getConversation(userNameOfOtherParty,req.currentUser.userName,socket);
                                }else{
                                    //sender is buyer
                                    //add data to the database
                                    getConversation(req.currentUser.userName,userNameOfOtherParty,socket);
                                }
                            }
                        });
                        //taking the intended user from the database

                        if(userNameOfOtherParty in onlineUsers){
                            onlineUsers[userNameOfOtherParty].emit('currentMessage',{/*created message*/});
                        }
                    }else{
                        //emit a different message
                    }
                }
            })
        });
        socket.on('disconnect',function(data){
            console.log(socket.userName);
            delete onlineUsers[socket.userName];
            //removing the user when he is deisconnected
        })
    });
}