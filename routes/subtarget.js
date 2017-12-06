var express = require('express');
var router = express.Router();

var Subtarget = require('../models/subtarget');
var Target = require('../models/target');
var User = require('../models/user');

router.use('/', function( req, res, next) {
    if(req.body.user) {
        User.findOne({
            "username": req.body.username
        }, function (err, user) {
            if(err){
                return res.status(401).json({
                    title: 'Not authenticated',
                    error: err
                });
            }
            next();
        })
    }
    else if(req.query.email) {
        User.findOne({
            "username": req.query.username
        }, function (err, user) {
            if(err){
                return res.status(401).json({
                    title: 'Not authenticated',
                    error: err
                });
            }
        next();
        });
    }
    else if(req.query.username) {
        User.findOne({
            "username": req.query.username
        }, function (err, user) {
            if(err){
                return res.status(401).json({
                    title: 'Not authenticated',
                    error: err
                });
            }
            next();
        });
    };
});

router.get('/:parentName', function (req, res, next) {
    User.findOne({
        "username": req.query.username
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        };
        Subtarget.find({
            "user": req.query.username,
            "parentName": req.params.parentName
        }, function(err, subtargets){
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            };
            res.status(200).json({
                message: 'Success',
                obj: subtargets
            });
        });
    });
});

router.post('/', function (req, res, next) {
    User.findOne({
        "username": req.query.username
    }, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        };
        Subtarget.findOne({
            "user": req.query.username,
            "name": req.body.name,
            "parentName": req.body.parentName
        }, function (err, existingTarget) {
            if (existingTarget) {
                return res.status(500).json({
                    title: 'An error occurred, subtarget may already exist',
                    error: err
                });
            }
            else {
                var subtarget = new Subtarget ({
                    name: req.body.name,
                    points: req.body.points,
                    length: req.body.length,
                    parentName: req.body.parentName,
                    completed: false,
                    description: req.body.description,
                    user: req.query.username
                });
                subtarget.save(function(err, result) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }
                    res.status(201).json({
                        message: 'Subtarget created',
                        obj: result
                    });
                });
            }
        });
        
    });
});

router.patch('/edit/:subtargetName', function ( req, res, next) {
    User.findOne({
        "username": req.query.username
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        };
        Subtarget.findOne({
            "name": req.params.subtargetName,
            "user": req.query.username
        }, function (err, subtarget) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            };
            if(!subtarget){
                return res.status(500).json({
                    title: 'No target found',
                    error: {message: 'Target not found'}
                });
            }
            subtarget.name = req.body.name;
            subtarget.length = req.body.length;
            subtarget.points = req.body.points;
            subtarget.description = req.body.description;
            
            subtarget.save(function(err,result){
                if(err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Updated target',
                    obj: result
                });
            });
        });
    });
});

router.patch('/complete/:subtargetName', function ( req, res, next) {
    User.findOne({
        "username": req.query.username
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        };
        Subtarget.findOne({
            "name": req.params.subtargetName,
            "user": req.query.username
        }, function (err, subtarget) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            };
            if(!subtarget){
                return res.status(500).json({
                    title: 'No target found',
                    error: {message: 'Target not found'}
                });
            }
            subtarget.completed = req.body.completed;
              
            subtarget.save(function(err,result){
                if(err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Updated target',
                    obj: result
                });
            });
        });
    });
});

router.delete('/:subtargetName', function (req, res, next) {
    User.findOne({
        "username": req.query.username
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        };
        Subtarget.findOne({
            "name": req.params.subtargetName,
            "user": req.query.username
        }, function (err, subtarget) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            };
            if(!subtarget){
                return res.status(500).json({
                    title: 'No target found',
                    error: {message: 'Target not found'}
                });
            }
            subtarget.remove(function (err, result){
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Deleted target',
                    obj: result
                });
            });
        });
    });
});

module.exports = router;