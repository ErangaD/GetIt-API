var express = require('express');
var router = express.Router();
var authenticate = require('../middlewares/authentication');
var validator = require('validator');
var Post = require('../model/Post');
var Reply = require('../model/Reply');
var Conversation = require('../model/Conversation');
var User = require('../model/User');
var isEmpty = require('lodash.isempty');
var Report = require('../model/Report');
function validateInput(data) {
    var errors = {};
    if(validator.isEmpty(data.remarks)){
        errors.remarks = "Remarks are required";
    }
    if(!validator.isFloat(data.price)){
        errors.price = "Price must be a number";
    }
    if(validator.isEmpty(data.price)){
        errors.price = "Price is required";
    }
    return({
        errors,
        isValid:isEmpty(errors)
    }
    );
}
router.route('/connectedUsers')
    .get(authenticate,function (req,res) {
        var currentUser=req.currentUser;
        if(currentUser.userType){
            Conversation.getBuyers(req.currentUser.userName,function (err, result) {
                if(err){
                    res.status(400).json('Internal error');
                }else{
                    var results={
                        connectedUsers:result,
                        userType:currentUser.userType
                    }
                    res.status(200).json(results);
                }
            });
        }else{
            Conversation.getSellers(req.currentUser.userName,function (err, result) {
                if(err){
                    res.status(400).json('Internal error');
                }else{
                    //console.log(result);
                    var results={
                        connectedUsers:result,
                        userType:currentUser.userType
                    }
                    res.status(200).json(results);
                }
            });
        }
    });
function validateReply(data){
    var errors = {};
    if(validator.isEmpty(data.price)){
        errors.price = "Price can not be empty";
    }
    if(!validator.isFloat(data.price)){
        errors.price = "Price should be a number";
    }
    return({
        errors,
        isValid:isEmpty(errors)
    })
}
router.route('/reply')
    .post(authenticate,function (req,res) {
        var data = req.body.data;
        //check validations
        const{errors,isValid} = validateReply(data);
        if(isValid){
            const {price,remarks,negotiable,id} = data;
            var user = req.currentUser;
            var newReply = null;
            if(user.userType){
                newReply = new Reply({
                    commentId:id,
                    senderUserName:user.userName,
                    price:parseFloat(price),
                    negotiable:negotiable,
                    remarks:remarks
                });
            }else{
                newReply=new Reply({
                    commentId:id,
                    senderUserName:user.userName,
                    price:null,
                    negotiable:null,
                    remarks:remarks
                });
            }
            Reply.addReply(newReply,function (err,reply) {
                if(err){
                    //return an appropriate response
                    console.log(err);
                    res.json(err.response);
                }else{
                    //console.log('successful');
                    //return a success message
                    res.json(reply);
                }
            })
        }else{
            res.status(400).json(errors);
        }

    });
router.route('/filterPosts')
    .post(authenticate,function (req,res) {
        //console.log(req.currentUser);
        Post.filterPosts(
            {
                option:req.body.selected,
                userId:req.currentUser.id,
                userType:req.currentUser.userType,
                saleType:req.currentUser.saleType
            }
            ,function (err,response) {
            if(err){
                res.status(500).send({error:'Internal error, Try again later'});
            }
            else{
                //sending filtered data
                res.send(response);
            }
        })
    });

router.route('/reply')
    .get(authenticate,function (req,res) {
        var commentId = req.query.commentId;
        //comment id is received from the params
        if(commentId){
            Reply.getReplies(commentId,function (err,replies) {
                if(err){

                }
                else{
                    //console.log(replies);
                    res.json({replies:replies,userType:req.currentUser.userType});
                }
            });
        }

    });
router.route('/profile')
    .get(authenticate,function (req,res) {
        res.status(200).json({user:req.currentUser});
    });
router.route('/posts')
    .get(authenticate,function (req,res) {
        if(req.currentUser.userType){
            //if seller
            //console.log(req.currentUser.saleType);
            Post.getPostsForSeller(req.currentUser.saleType,function (err, comments) {
                if(err){
                    console.log(err);
                }else{
                    var data={
                        comments:comments,
                        userType:req.currentUser.userType
                    }
                    //console.log(req.currentUser.saleType);
                    res.json(data);
                }
            });
        }else{
            Post.getPosts(req.currentUser.id,function (err, comments) {
                if(err){
                    console.log(err);
                }else{
                    var data={
                        comments:comments,
                        userType:req.currentUser.userType
                    }
                    res.json(data);
                }
            });
        }

    });
router.route('/posts')
    .post(authenticate,function (req,res) {
        var data = req.body.data;
        const {errors, isValid} = validateInput(data);
        if(isValid){
            const{price,remarks,saleType}=data;
            var newComment=new Post({
                userId:req.currentUser.id,
                remarks:remarks,
                price:parseFloat(price),
                saleType:saleType
            });
            Post.createPost(newComment,function (err, comment) {
                if(err){
                    res.status(500).json({error:'Process was unsuccessful'});
                }else{
                    res.json(comment);
                }

            });
        }else{
            res.status(400).json(errors);
        }
    });

router.route('/reports')
    .post(authenticate,function (req,res) {
        if(!req.currentUser.userType){
            //if the user is a buyer
            //after ding validation
            const{sellerName,remarks}=req.body.data;
            //check whether the seller exists
            User.getUserByUsername(sellerName,function(err,seller){
                if(err){
                    res.status(500).send({error:'Error in saving data!'});
                }
                else if(seller){
                    var newReport=new Report({
                        buyerUserName:req.currentUser.userName,
                        sellerUserName:sellerName,
                        remarks:remarks
                    });
                    Report.addReport(newReport,function (err,report) {
                        if(err){
                            res.status(500).send({error:'Error saving data!'});
                        }
                        else{
                            res.send(report);
                        }
                    });
                }else{
                    res.status(400).send({error:'Seller User Name is invalid!'});
                }

            });

        }
    });
router.route('/reports')
    .get(authenticate,function (req,res) {
        if(!req.currentUser.userType){
            //if the user is a buyer
            Report.getReports(req.currentUser.userName,function (err,report) {
                if(err){
                    res.status(500).send({error:'Internal error, Try again'});
                }
                else{
                    res.send(report);
                }
            });
        }
    });
module.exports = router; 