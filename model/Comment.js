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