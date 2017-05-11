var express = require('express');
var router = express.Router();
var authenticate=require('../middlewares/adminAuth');
var Report = require('../model/Report');
router.route('/')
    .post(function (req,res) {
        //check whether log in or not
        
    });
router.route('/report')
    .post(authenticate,function (req,res) {
       //sending report data
        //after validating the admin
        Report.getReportsByDate(function (err,results) {
            if(err){
                res.status(500).send({error:'Error ocurred. Try again later'});
            }
            else{
                res.send(results);
            }
        })
        
    });
router.route('/addReply')
    .post(authenticate,function (req,res) {
        Report.getReportById(req.body.data.id,function (err,response) {
            if(err){
                res.status(500).send({error:'Internal error, Try again later'});
            }else if(response){
                response.reply=req.body.data.reply;
                //have to add the username of the
                response.save(function (err,resp) {
                    res.send({success:'Added successfully'});
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