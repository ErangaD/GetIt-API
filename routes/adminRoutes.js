var express = require('express');
var router = express.Router();
var authenticate=require('../middlewares/adminAuth');
var Report = require('../model/Report');
var jwt = require('jsonwebtoken');
var Admin = require('../model/Admin');
var config = require('../config');
router.route('/')
    .post(function (req,res) {
        //check whether log in or not

        //One admin user
        /************/
        /*var newUser = new Admin({
            name: 'Gayan',
            email: 'erangadulshan10@gmail.com',
            password: 1994,
            userName: 'Gayan'
        });
        Admin.createUser(newUser,function (err,user) {
            if(err)
                throw err;
            console.log(user);
        });*/
        /**************/
        const {userName,password} = req.body.user;

        //Admin login by checking the database

        Admin.getUserByUsername(userName,function (err,user) {
            if(err){
                res.status(500).json({error:err});
            }else{
                if(user){
                    Admin.comparePassword(password,user.password,function (err,isMatch) {
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
                            res.status(500).json({error:'No match'});
                        }
                    });
                }
                else{
                    res.status(500).json({error:"No user"});
                }
            }
        })
    });
router.route('/dashboard')
    .post(authenticate,function (req,res) {
        //current logged in user in req.currentUser
        if(req.currentUser){
            res.send(req.currentUser);
        }else {
            res.status(400).send({error:"Not authenticated"});
        }
    });
router.route('/report')
    .post(authenticate,function (req,res) {
       //sending report data
        //after validating the admin
        if(req.currentUser){
            Report.getReportsByDate(function (err,results) {
                if(err){
                    res.status(500).send({error:'Error ocurred. Try again later'});
                }
                else{
                    res.send(results);
                }
            })
        }

        
    });
router.route('/addReply')
    .post(authenticate,function (req,res) {
        //adding a reply to a current complaint
        Report.getReportById(req.body.data.id,function (err,response) {
            if(err){
                res.status(500).send({error:'Internal error, Try again later'});
            }else if(response){
                response.reply=req.body.data.reply;
                response.assessedBy=req.currentUser.userName;
                response.finished=true;
                response.save(function (err,resp) {
                    if(err){
                        throw err;
                    }else{
                        res.send({success:'Added successfully'});
                    }

                });
            }else{
                res.status(400).send({error:'You are accessing a report that not in the database'});
            }
        })
    });
router.route('/filterReports')
    .post(authenticate,function (req,res) {
       Report.filterReports(req.body.selected,function (err,response) {
           if(err){
               res.status(500).send({error:'Internal error, Try again later'});
           }
           else{
               res.send(response);
           }
       })
    });
module.exports = router;