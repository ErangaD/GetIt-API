var express = require('express');
var router = express.Router();
var User = require('../model/User');
var validator = require('validator');
var isEmpty = require('lodash.isempty');
var jwt = require('jsonwebtoken');
var config = require('../config');
function validateInput(data){
    var errors = {};
    //console.log(data);
    if(validator.isEmpty(data.email)){
        errors.email = "Email is required";
    }
    //console.log(data.email);
    if(validator.isEmpty(data.name)){
        errors.name = "Name is required";
    }
    //console.log(data.name);
    if(validator.isEmpty(data.password)){
        errors.password = "Password is required";
    }
    //console.log(data.password);
    if(!validator.isEmail(data.email)){
        errors.email="Email is invalid";
    }
    //console.log(data.email);
    if(validator.isEmpty(data.password2)){
        errors.password2 = "Reenter password";
    }
    //console.log('password2');
    if(validator.isEmpty(data.userName)){
        errors.userName="User name is required";
    }
    //console.log(data.userName);
    if(validator.isEmpty(data.telNo)){
        errors.telNo="Telephone number is required";
    }
    //console.log(data.telNo);
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
        //if userType is false it implies a buyer
        if(isValid){
            const {userName,name,email,telNo,password,number,laneNumber,address1,address2} = req.body.user;
            var newUser = new User({
                name: name,
                email: email,
                password: password,
                userName: userName,
                telNo: telNo,
                userType:false
            });
            User.getUserByUsername(userName,function (err,user) {
                if(err){
                    res.status(500).json({error:'Try again'});
                }else{
                    if(user){
                        errors.userName = "User name exists";
                        res.status(500).json(errors);
                    }else{
                        User.checkEmail(email,function (err,user) {
                            if(err){
                                res.status(500).json({error:'Try again'});
                            }else{
                                if(user){
                                    errors.email="Email exists";
                                    res.status(500).json(errors);
                                }else{
                                    User.createUser(newUser,function (err,user) {
                                        if(err) {
                                            res.status(500).json({error:'Try again'});
                                        }else{
                                            const token = jwt.sign({
                                                id:user._id,
                                                userName:userName
                                            },config.jwtSecret,{ expiresIn: 60 * 60 });
                                            res.status(200).json({token});
                                        }
                                    });
                                }
                            }
                        });
                    }
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
        //console.log(data);
        const {errors, isValid} = validateInput(data);
        if(isValid){
            const {userName,name,email,telNo,password,saleType} =data;
            //user type is set to true to inform that user is a seller
            var newUser = new User({
                name: name,
                email: email,
                password: password,
                userName: userName,
                telNo: telNo,
                userType:true,
                salesTypes:saleType,
                address:{
                    number:data.number,
                    streetAddress:data.laneNumber,
                    ruralAddress:data.address1,
                    cityName:data.address2
                }
            });
            User.getUserByUsername(userName,function (err,user) {
                if(err){
                    res.status(500).json({error:'Try again'});
                }else{
                    if(user){
                        errors.userName = "User name exists";
                        res.status(500).json(errors);
                    }else{
                        User.checkEmail(email,function (err,user) {
                            if(err){
                                res.status(500).json({error:'Try again'});
                            }else{
                                if(user){
                                    errors.email="Email exists";
                                    res.status(500).json(errors);
                                }else{
                                    User.createUser(newUser,function (err,user) {
                                        if(err) {
                                            console.log(err);
                                            res.status(500).json({error:'Try again'});
                                        }else{
                                            const token = jwt.sign({
                                                id:user._id,
                                                userName:userName
                                            },config.jwtSecret,{ expiresIn: 60 * 60 });
                                            res.status(200).json({token});
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });

        }
        else{
            res.status(400).json(errors);
        }
    });
module.exports = router;