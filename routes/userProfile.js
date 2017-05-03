var express = require('express');
var router = express.Router();
var authenticate = require('../middlewares/authentication');
var validator = require('validator');
var Post = require('../model/Post');
var Reply = require('../model/Reply');
var Conversation = require('../model/Conversation');
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
router.route('/connectedUsers')
    .get(authenticate,function (req,res) {
        var currentUser=req.currentUser;
        if(currentUser.userType){
            Conversation.getBuyers(req.currentUser,function (err, result) {
                if(err){
                    res.status(400).json('Internal error');
                }else{
                    res.status(200).json(result);
                }
            });
        }else{
            Conversation.getSellers(req.currentUser.userName,function (err, result) {
                if(err){
                    res.status(400).json('Internal error');
                }else{
                    console.log(result);
                    var results={
                        connectedUsers:result,
                        userType:currentUser.userType
                    }
                    res.status(200).json(results);
                }
            });
        }

    });
router.route('/reply')
    .post(authenticate,function (req,res) {
        var data = req.body.data;
        const {price,remarks,negotiable,id} = data;
        var user = req.currentUser;
        var newReply = null;
        if(user.userType){
            newReply = new Reply({
                commentId:id,
                senderId:user.id,
                price:price,
                negotiable:negotiable,
                remarks:remarks
            });
        }else{
            newReply=new Reply({
                commentId:id,
                senderId:user.id,
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
                console.log('successful');
                //return a success message
                res.json('successfully added to the database');
            }
        })
    });
router.route('/reply')
    .get(authenticate,function (req,res) {
        var commentId = req.query.commentId;
        if(commentId){
            Reply.getReplies(commentId,function (err,replies) {
                if(err){

                }
                else{
                    console.log(replies);
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
            console.log(req.currentUser.saleTypes);
            Post.getPostsForSeller(req.currentUser.saleTypes,function (err, comments) {
                if(err){
                    console.log(err);
                }else{
                    var data={
                        comments:comments,
                        userType:req.currentUser.userType
                    }
                    console.log(req.currentUser.saleType);
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
            const{price,remarks,selectedOption}=data;
            var newComment=new Post({
                userId:req.currentUser.id,
                remarks:remarks,
                price:price,
                saleType:selectedOption
            });
            Post.createPost(newComment,function (err, comment) {
                if(err){
                    res.status(500).json({error:'Process was unsuccessful'});
                }else{
                    res.json({success:true});
                }

            });
        }else{
            res.status(400).json(errors);
        }
    });
module.exports = router; 