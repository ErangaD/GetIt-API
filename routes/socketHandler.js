var Conversation = require('../model/Conversation');
var User = require('../model/User');
var Message = require('../model/Message');
var authenticate = require('../middlewares/socketAuthentication');


function getMessages(buyerUserName,sellerUserName,socket,userNameOfOtherParty){
    Conversation.getMessages(buyerUserName,sellerUserName,function (err, messages) {
        if(!err){
            //messages contains all the messages in the conversation
            //console.log(messages);
            socket.emit('messages',{messages:messages[0],userNameOfOther:userNameOfOtherParty});
        }else{
            console.log(err);
        }
    });
}
function addConversation(buyerUserName, sellerUserName, socket, text, fn) {
    Conversation.getConversation(buyerUserName,sellerUserName,function (err, conversation) {
        if(!err){
            //conversation object is retrieved
            var message=new Message({
                text: text
            });
            if(conversation.length==0){
                var cnv = new Conversation({
                    sellerUserName:sellerUserName,
                    buyerUserName:buyerUserName,
                    messages:[message]
                });
                Conversation.createConversation(cnv,function (err,cnvsersation) {
                    if(err){
                        throw err;
                    }
                    //sending back the message
                    //console.log(cnvsersation);
                    socket.emit('ongoing',cnvsersation.messages[0]);
                    //return cnvsersation.messages[0];
                    fn(cnvsersation.messages[0]);
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
                        //return message;
                        fn(message);
                    }
                });
            }
        }else{
            throw err;
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
            authenticate(data,function (req) {
                //console.log(req);
                //data and req is the same
                if(req.currentUser){
                    socket.userName=req.currentUser.userName;
                    onlineUsers[socket.userName]=socket;
                    //console.log(data.currentUser);
                    if(req.userId){
                        var userNameOfOtherParty;
                        User.getUserById(req.userId,function (err,user) {
                            if(err){
                                //sending a error message that use does not exists
                                console.log(err);
                            }else{
                                //console.log(user);
                                userNameOfOtherParty=user.userName;
                                if(req.currentUser.userType){
                                    getMessages(userNameOfOtherParty,req.currentUser.userName,socket,userNameOfOtherParty);
                                }else{
                                    getMessages(req.currentUser.userName,userNameOfOtherParty,socket,userNameOfOtherParty);
                                }
                            }
                        });
                        //console.log(data.currentUser);

                    }else if(req.userName){
                        var userNameOfOtherParty=req.userName;
                        if(req.currentUser.userType){
                            getMessages(userNameOfOtherParty,req.currentUser.userName,socket,userNameOfOtherParty);
                        }else{
                            getMessages(req.currentUser.userName,userNameOfOtherParty,socket,userNameOfOtherParty);
                        }
                    }else{
                        //emit a different message
                    }
                }
            });
        });
        socket.on('send',function(data){
            //have to check that authentication works
            //console.log(data);
            authenticate(data,function (req) {
                //console.log(req);
                //data and req is the same
                if(req.currentUser){
                    if(req.userName){
                        var userNameOfOtherParty=req.userName;
                        if(req.currentUser.userType){
                            addConversation(userNameOfOtherParty,req.currentUser.userName,socket,req.text,function (message) {
                                //console.log(userNameOfOtherParty);
                                if(userNameOfOtherParty in onlineUsers){
                                    //sending the message if the user in the conversation
                                    //console.log(userNameOfOtherParty);
                                    onlineUsers[userNameOfOtherParty].emit('ongoing',message);
                                }
                            });
                        }else{
                            addConversation(req.currentUser.userName,userNameOfOtherParty,socket,req.text,function (message) {
                                if(userNameOfOtherParty in onlineUsers){
                                    //sending the message if the user in the conversation
                                    //console.log(userNameOfOtherParty);
                                    onlineUsers[userNameOfOtherParty].emit('ongoing',message);
                                }
                            });
                        }
                    }else{
                        //emit a different message
                    }
                }
            });
        });
        socket.on('disconnect',function(){
            console.log(socket.userName);
            delete onlineUsers[socket.userName];
            //removing the user when he is deisconnected
        })
    });
}