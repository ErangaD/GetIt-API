var express = require('express');
var router = express.Router();
var authenticate = require('../middlewares/authentication');
var validator = require('validator');
var Comment = require('../model/Comment');
var isEmpty = require('lodash.isempty');
function validateInput(data) {
    var errors = {};
    if(validator.isEmpty(data.remarks)){
        errors.email = "Remarks are required";
    }
    if(validator.isEmpty(data.price)){
        errors.name = "Price is required";
    }
    return({
        errors,
        isValid:isEmpty(errors)
    }
    );
}
router.route('/profile')
    .get(authenticate,function (req,res) {
        res.status(200).json({user:req.currentUser});
    });
router.route('/posts')
    .get(authenticate,function (req,res) {
        Comment.getComments(req.currentUser.id,function (err,comments) {
            if(err){
                console.log(err);
            }else{
                res.json(comments);
            }
        });
    });
router.route('/posts')
    .post(authenticate,function (req,res) {
        var data = req.body.data;
        const {errors, isValid} = validateInput(data);
        if(isValid){
            const{price,remarks,selectedOption}=data;
            var newComment=new Comment({
                userId:req.currentUser.id,
                remarks:remarks,
                price:price,
                saleType:selectedOption
            });
            Comment.createComment(newComment,function (err,comment) {
                if(err){
                    res.status(500).json({error:'Process was unsuccessful'});
                }else{
                    console.log(comment);
                }

            });
        }else{
            res.status(400).json(errors);
        }
    });
module.exports = router;