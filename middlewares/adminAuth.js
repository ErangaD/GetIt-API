var jwt = require('jsonwebtoken');
var config = require('../config');
var Admin = require('../model/Admin');
function authentication(req,res,next) {
    /*if(req.body.token){
        var token=req.body.token;
        jwt.verify(token,config.jwtSecret,function (err,decoded) {
            if(err){
                //if the token validation goes wrong respond with 400 error
                res.status(400).json({error:'Failed to authenticate'});
            }else{
                Admin.getUserById(decoded.id,function (err,user) {
                    //if the token is valid finding the user
                    if(err){
                        res.status(404).json({error:'There is no such user'});
                    }
                    const {_id,name,email,userName,userType,saleTypes,telNo} = user;
                    //getting only the required details since password details must not give with the response
                    var currentUser = {id:_id,name:name,email:email,userName:userName,userType:userType,saleType:saleTypes,telNo:telNo};
                    if(userType){
                        //if the user is a seller sending the address details
                        currentUser.address=user.address;
                    }
                    //setting the current user and sending to client side
                    req.currentUser= currentUser;
                    next();
                });
            }
        });
    }*/
    next();
}
module.exports=authentication;