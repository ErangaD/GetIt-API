var mongoose = require("mongoose");
var MessageSchema = new mongoose.Schema({
    text:{
        type:String
    },
    time:{
        type:Date
    }
});
var Message = module.exports=mongoose.model('Message',MessageSchema);
