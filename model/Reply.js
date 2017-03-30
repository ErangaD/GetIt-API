var mongoose = require("mongoose");
var replySchema = new mongoose.Schema({
    commentId:{
        type:String
    },
    senderId:{
        type:String
    },
    price:{
        type:String
    },
    negotiable:{
        type:Boolean
    },
    remarks:{
        type:String
    }
});