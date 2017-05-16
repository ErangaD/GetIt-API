var mongoose = require("mongoose");
var ConversationSchema = new mongoose.Schema({
    sellerUserName:{
        type:String
    },
    buyerUserName:{
        type:String
    },
    messages:[{}]
});
var Conversation = module.exports=mongoose.model('Conversation',ConversationSchema);
module.exports.getBuyers=function (userName,callback) {
    //getting the buyer when a seller requests
    var query = Conversation.find({sellerUserName:userName}).select('buyerUserName -_id');
    query.exec(callback);
}
module.exports.getSellers=function (userName,callback) {
    //getting the sellers when a buyer requests
    var query = Conversation.find({buyerUserName:userName}).select('sellerUserName -_id');
    query.exec(callback);
}
module.exports.getMessages=function (buyerUserName,sellerUserName,callback) {
    var query = Conversation.find({sellerUserName:sellerUserName,buyerUserName:buyerUserName}).select('messages -_id');
    query.exec(callback); 
}
module.exports.getConversation=function (buyerUserName,sellerUserName,callback) {
    var query = Conversation.find({sellerUserName:sellerUserName,buyerUserName:buyerUserName});
    query.exec(callback);
}
module.exports.createConversation=function (conversation,callback) {
    conversation.save(callback);
}
