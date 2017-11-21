var express = require('express');
var router = express.Router();

var Target = require('../models/target');
var Subtarget = require('../models/subtarget');
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

router.get('/', function (req, res, next) {
    User.findOne({
        "username": req.query.username
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        };
        Target.find({
            "user": req.query.username
        }, function(err, targets){
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            };
            res.status(200).json({
                message: 'Success',
                obj: targets
            });
        });
    });
});
/*
router.get('/:targetName', function (req, res, next) {
    User.findOne({
        "username": req.query.username
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        };
        Target.findOne({
            "user": req.query.username,
            "name": req.params.targetName
        }, function (err, target) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            };
            res.status(200).json({
                message: 'Success',
                obj: target
            });
        });
    });
});

Unneccessary

*/
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
        Target.findOne({
            "user": req.query.username,
            "name": req.body.name
        }, function (err, existingTarget) {
            if (existingTarget) {
                return res.status(500).json({
                    title: 'An error occurred, target may already exist',
                    error: err
                });
            };
        });
        var target = new Target ({
            name: req.body.name,
            points: req.body.points,
            length: req.body.length,
            completed: false,
            description: req.body.description,
            subtargets: [],
            user: req.query.username
        });
        target.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Target created',
                obj: result
            });
        });
    });
});

router.patch('/edit/:targetName', function ( req, res, next) {
    User.findOne({
        "username": req.query.username
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        };
        Target.findOne({
            "name": req.params.targetName,
            "user": req.query.username
        }, function (err, target) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            };
            if(!target){
                return res.status(500).json({
                    title: 'No target found',
                    error: {message: 'Target not found'}
                });
            }
            target.name = req.body.name;
            target.length = req.body.length;
            target.points = req.body.points;
            target.description = req.body.description;
            
            target.save(function(err,result){
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

router.patch('/complete/:targetName', function ( req, res, next) {
    User.findOne({
        "username": req.query.username
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        };
        Target.findOne({
            "name": req.params.targetName,
            "user": req.query.username
        }, function (err, target) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            };
            if(!target){
                return res.status(500).json({
                    title: 'No target found',
                    error: {message: 'Target not found'}
                });
            }
            target.completed = req.body.completed;
              
            target.save(function(err,result){
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

router.delete('/:targetName', function (req, res, next) {
    User.findOne({
        "username": req.query.username
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        };
        Target.findOne({
            "name": req.params.targetName,
            "user": req.query.username
        }, function (err, target) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            };
            if(!target){
                return res.status(500).json({
                    title: 'No target found',
                    error: {message: 'Target not found'}
                });
            }
            Subtarget.find({
                "parentName": target.name
            }, function (err, subtargets){
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                };
                for(var i=0; i<subtargets.length; i++){
                    subtargets[i].remove(function (err, result){
                        if (err) {
                            return res.status(500).json({
                                title: 'An error occurred',
                                error: err
                            });
                        }
                    })
                }
            });
            target.remove(function (err, result){
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Deleted target and subtargets',
                    obj: result
                });
            });
        });
    });
});

module.exports = router;