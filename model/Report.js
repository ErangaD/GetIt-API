var mongoose = require("mongoose");
var reportSchema = new mongoose.Schema({
    buyerUserName:{
        type:String
    },
    sellerUserName:{
        type:String
    },
    remarks:{
        type:String
    },
    reply:{
        type:String
    },
    date:{
        type:Date,
        default: Date.now
    },
    assessed:{
        type:Boolean,
        default:false
    }
});
var Report = module.exports=mongoose.model('Report',reportSchema);
module.exports.getReports=function (userName,callback) {
    Report.find({buyerUserName:userName},callback);
}
module.exports.addReport=function (report,callback) {
    report.save(callback);
}