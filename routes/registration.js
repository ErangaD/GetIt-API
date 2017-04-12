var express = require('express');
var router = express.Router();
var User = require('../model/User');
var validator = require('validator');
var isEmpty = require('lodash.isempty');
var jwt = require('jsonwebtoken');
var config = require('../config');
function validateInput(data){
    var errors = {};
    if(validator.isEmpty(data.email)){
        errors.email = "Email is required";
    }   
    if(validator.isEmpty(data.name)){
        errors.name = "Name is required";
    }
    if(validator.isEmpty(data.password)){
        errors.password = "Password is required";
    }
    if(!validator.isEmail(data.email)){
        errors.email="Email is invalid";
    }
    if(validator.isEmpty(data.password2)){
        errors.password2 = "Reenter password";
    }
    if(validator.isEmpty(data.userName)){
        errors.userName="User name is required";
    }
    if(validator.isEmpty(data.telNo)){
        errors.telNo="Telephone number is required";
    }
    if(!validator.equals(data.password,data.password2)){
        errors.password2="Password must match";
    }
    return({
        errors,
        isValid:isEmpty(errors)
        }
    );
}
router.route('/buyerRegistration')
    .post(function (req,res) {
       const {errors, isValid} = validateInput(req.body.user);
        if(isValid){
            const {userName,name,email,telNo,password} = req.body.user;
            var newUser = new User({
                name: name,
                email: email,
                password: password,
                userName: userName,
                telNo: telNo,
                userType:false
            });
            User.createUser(newUser,function (err,user) {
                if(err) {
                    res.status(500).json({error:err});
                }else{
                    const token = jwt.sign({
                        id:user._id,
                        userName:userName
                    },config.jwtSecret,{ expiresIn: 60 * 60 });
                    res.status(200).json({token});
                }

            });
        }else{
            res.status(400).json(errors);
        }
    });
//have to check for errors on address
router.route('/sellerRegistration')
    .post(function (req,res) {
        var data=req.body.user;
        const {errors, isValid} = validateInput(data);
        if(isValid){
            const {userName,name,email,telNo,password} =data;
            var newUser = new User({
                name: name,
                email: email,
                password: password,
                userName: userName,
                telNo: telNo,
                userType:true,
                address:{
                    number:data.number,
                    streetAddress:data.laneNumber,
                    ruralAddress:data.address1,
                    cityName:data.address2
                }
            });
            User.createUser(newUser,function (err,user) {
                if(err) {
                    res.status(500).json({error:err});
                }else{
                    console.log(user);
                    res.status(200).json({user:user});
                }
            });
        }
        else{
            res.status(400).json(errors);
        }
    });
module.exports = router;