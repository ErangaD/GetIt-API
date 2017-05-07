var mongoose = require("mongoose");
var MessageSchema = new mongoose.Schema({
    text:{
        type:String
    },
    time:{
        type:Date,
        default: Date.now
    }
});
var Message = module.exports=mongoose.model('Message',MessageSchema);
