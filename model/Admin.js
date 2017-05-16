var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
//mongoose.createConnection('mongodb://localhost/getIt_rest');

var db = mongoose.connection;

var UserSchema= mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        dropDups: true
    },
    password:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        dropDups: true
    },
    name:{
        type:String
    },
    time : {
        type : Date,
        default: Date.now
    }
});


var User = module.exports=mongoose.model('Admin',UserSchema);

module.exports.createUser = function (newUser,callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password=hash;
            newUser.save(callback);
        });
    });
}
module.exports.getUserByUsername=function (username,callback) {
    var query = {userName:username};
    User.findOne(query,callback);
}
module.exports.getUserById=function (id,callback) {
    User.findById(id,callback);
}
module.exports.comparePassword=function (password,hash,callback) {
    bcrypt.compare(password,hash,function (err,isMatch) {
        //comparing password for the correct user
        if(err)throw err;
        callback(null,isMatch);
    });
}