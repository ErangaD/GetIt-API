var express = require('express');
var router = express.Router();
var validator = require('validator');
var isEmpty = require('lodash.isempty');
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
    if(validator.isEmpty(data.tpNumber)){
        errors.tpNumber="Telephone number is required";
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
        console.log(isValid);
        if(isValid){
            res.status(200).json({success:true});
        }else{
            res.status(400).json(errors);
        }
    });

module.exports = router;