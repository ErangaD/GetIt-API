
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
mongoose.createConnection('mongodb://localhost/getIt_rest');
var db = mongoose.connection;

var UserSchema= mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    name:{
        type:String
    },
    telNo:{
        type:String
    },
    userType:{
        type:Boolean,
        //false implies that user is a buyer
        default:false
    },
    address:{
        number:{type:String},
        streetAddress:{type:String},
        ruralAddress:{type:String},
        cityName:{type:String}
    },
    saleTypes:[String]
});

UserSchema.index({username:1,email:1},{unique:true});

var User = module.exports=mongoose.model('User',UserSchema);

module.exports.createUser = function (newUser,callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password=hash;
            console.log(hash);
            newUser.save(callback);
        });
    });
}
module.exports.getUserByUsername=function (username,callback) {
    console.log(username);
    var query = {username:username};
    User.findOne(query,callback);
}
module.exports.getUserById=function (id,callback) {
    User.findById(id,callback);
}
module.exports.comparePassword=function (password,hash,callback) {
    bcrypt.compare(password,hash,function (err,isMatch) {
        if(err)throw err;
        console.log(isMatch);
        callback(null,isMatch);
    });
}