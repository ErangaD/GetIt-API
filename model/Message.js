var mongoose = require("mongoose");
var messageSchema = new mongoose.Schema({
    senderId:{
        type:String
    }  ,
    receiverId:{
        type:String
    },
    message:{
        type:String
    },
    time:{
        type:Date
    }
})