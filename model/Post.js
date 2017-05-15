var mongoose = require("mongoose");

var PostSchema = mongoose.Schema({
    userId:{
        type:String
    },
    saleType:{
        type:String
    },
    price:{
        type:Number
    },  
    remarks:{
        type:String
    },
    time : {
        type : Date,   
        default: Date.now
    }
});
var Post = module.exports=mongoose.model('Post',PostSchema);
module.exports.getPosts=function (userId, callback) {
    Post.find({userId:userId},callback);
}
module.exports.getPostsForSeller=function (saleType, callback) {
    Post.find({saleType:saleType},callback);
}
module.exports.createPost=function (comment, callback) {
    comment.save(callback);
}
module.exports.filterPosts=function (data, callback) {
    if(data.userType){
        //if a seller
        switch (data.option){
            case '0':
                //sort by date for the user's type
                Post.find({saleType:data.saleType}).sort({time:-1}).exec(callback);
                break;
            case '1':
                //sort by price for the user's type
                var query = Post.find({saleType:data.saleType}).sort({price:-1});
                query.exec(callback);
                break;
        }
    }else{
        //user is a buyer
        switch (data.option){
            case '0':
                //by date
                Post.find({userId:data.userId}).sort({time:-1}).exec(callback);
                break;
            case '1':
                //by vehicle
                var query = Post.find({saleType:'Vehicle',userId:data.userId}).sort({time:-1});
                query.exec(callback);
                break;
            case '2':
                //electronic
                var query = Post.find({saleType:'Electronic',userId:data.userId}).sort({time:-1});
                query.exec(callback);
                break;
            case '3':
                //Property
                Post.find({saleType:'Property',userId:data.userId}).sort({time:-1}).exec(callback);
                break;
        }
    }

}