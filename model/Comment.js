var mongoose = require("mongoose");

var CommentSchema = mongoose.Schema({
    userId:{
        type:String
    },
    saleType:{
        type:String
    },
    price:{
        type:String
    },
    remarks:{
        type:String
    }
});
var Comment = module.exports=mongoose.model('Comment',CommentSchema);
module.exports.getComments=function (userId,callback) {
    Comment.find({userId:userId},callback);
}
module.exports.createComment=function (comment,callback) {
    comment.save(callback);
}