var mongoose = require("mongoose");
var messageSchema = new mongoose.Schema({
    sellerId:{
        type:String
    },
    buyerId:{
        type:String
    },
    message:{
        type:String
    },
    time:{
        type:Date
    }
});
var Message = module.exports=mongoose.model('Message',messageSchema);
module.exports.getBuyers=function (id,callback) {
    Message.find({buyerId:id},callback);
}
module.exports.getSellers=function (id,callback) {
    Message.find({sellerId:id},callback);
}