var express = require('express');
var router = express.Router();
var authenticate = require('../middlewares/authentication');
var validator = require('validator');
var isEmpty = require('lodash.isempty');

router.route('/profile')
    .get(authenticate,function (req,res) {
        res.status(200).json({user:req.currentUser});
    });


module.exports = router;