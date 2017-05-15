var mongoose = require("mongoose");
var replySchema = new mongoose.Schema({
    commentId:{
        type:String
    },
    senderUserName:{
        type:String
    },
    price:{
        type:Number
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
    //getting the values in descendant order
    Reply.find({commentId:commentId}).sort({price:-1}).exec(callback);
}
module.exports.addReply=function (reply,callback) {
    reply.save(callback);
}