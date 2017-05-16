var User = require('../model/User');
var jwt = require('jsonwebtoken');
var config = require('../config');
function socketAuth(req,next) {
    if(req.token){
        var token=req.token;
        jwt.verify(token,config.jwtSecret,function (err,decoded) {
            if(err){
                //console.log(err);
                //if the token validation goes wrong respond with current user null
                req.currentUser=null;
                next(req);
            }else{
                User.getUserById(decoded.id,function (err,user) {
                    //if the token is valid finding the user
                    //console.log(user);
                    if(err){
                        req.currentUser=null;
                    }else{
                        const {_id,name,email,userName,userType,saleTypes,telNo} = user;
                        //getting only the required details since password details must not give with the response
                        var currentUser = {id:_id,name:name,email:email,userName:userName,userType:userType,saleType:saleTypes,telNo:telNo};
                        if(userType){
                            //if the user is a seller sending the address details
                            currentUser.address=user.address;
                        }
                        //setting the current user and sending to client side
                        req.currentUser= currentUser;
                        next(req);
                    }
                });
            }
 
        });
    }
}
module.exports = socketAuth;