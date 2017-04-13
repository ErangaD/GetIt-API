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
var Reply = module.exports=mongoose.model('Reply',replySchema);
module.exports.getReplies=function (commentId,callback) {
    Reply.find({commentId:commentId},callback);
}
module.exports.addReply=function (reply,callback) {
    reply.save(callback);
}