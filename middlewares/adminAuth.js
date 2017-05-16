var jwt = require('jsonwebtoken');
var config = require('../config');
var Admin = require('../model/Admin');
function authentication(req,res,next) {
    if(req.body.token){
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
                    if(user){
                        const {_id,name,email,userName} = user;
                        //getting only the required details since password details must not give with the response
                        var currentUser = {id:_id,name:name,email:email,userName:userName};
                        req.currentUser= currentUser;
                        next();
                    }
                });
            }
        });
    }
    //else no token redirect
    else{
        //console.log(req.body);
        next();
    }
}
module.exports=authentication;