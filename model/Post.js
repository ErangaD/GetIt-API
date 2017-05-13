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
    },
    time : {
        type : Date,   
        default: Date.now
    }
});
var Comment = module.exports=mongoose.model('Post',CommentSchema);
module.exports.getPosts=function (userId, callback) {
    Comment.find({userId:userId},callback);
}
module.exports.getPostsForSeller=function (saleType, callback) {
    Comment.find({saleType:saleType},callback);
}
module.exports.createPost=function (comment, callback) {
    comment.save(callback);
}