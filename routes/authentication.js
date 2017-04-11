var express = require('express');
var router = express.Router();
    var User = require('../model/User');
var validator = require('validator');
var isEmpty = require('lodash.isempty');
var jwt = require('jsonwebtoken');
var config = require('../config');
function validateInput(data) {
        var errors = {};
        if(validator.isEmpty(data.userName)){
            errors.name = "Name is required";
        }
        if(validator.isEmpty(data.password)){
            errors.password = "Password is required";
        }
        return({
            errors,
            isValid:isEmpty(errors)
        })
 }
router.route('/')
    .post(function (req,res) {
        const {errors,isValid}=validateInput(req.body.user);
        if(isValid){
            const {userName,password} = req.body.user;
            User.getUserByUsername(userName,function (err,user) {
                if(err){
                    res.status(500).json({error:err});
                }else{
                    if(user){
                        User.comparePassword(password,user.password,function (err,isMatch) {
                            if(err){
                                res.status(500).json({error:err});
                            }else if(isMatch){
                                //there is a match
                                const token = jwt.sign({
                                    id:user._id,
                                    userName:userName
                                },config.jwtSecret,{ expiresIn: '3h'});
                                res.json({token});
                            }else{
                                //there is no match have to inform invalid credentials
                                res.status(500).json({error:err});
                            }
                        });
                    }
                    else{
                        res.status(500).json({error:err});
                    }
                }
            })
        }
    });
module.exports = router;