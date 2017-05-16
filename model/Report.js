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
    assessedBy:{
        type:String,
        default:null
    },
    finished:{
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
module.exports.getReportsByDate=function (callback) {
    Report.find({}).sort({date:-1}).exec(callback);
}
module.exports.getReportById=function (id,callback) {
    Report.findById(id,callback);
}
module.exports.getComplaints=function(userName,callback){
    Report.find({sellerUserName:userName}).sort({date:-1}).exec(callback);
}
module.exports.filterReports=function (options,callback) {
    switch (options){
        case '0':
            //by date
            Report.find({}).sort({date:-1}).exec(callback);
            break;
        case '1':
            //by not assessed
            var query = Report.find({finished:false}).sort({date:-1});
            query.exec(callback);
            break;
        case '2':
            //assessed
            var query = Report.find({finished:true}).sort({date:-1});
            query.exec(callback);
            break;
        case '3':
            //all
            Report.find({}).exec(callback);
            break;
    }
}