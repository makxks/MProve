var express = require('express');
var router = express.Router();

var Reward = require('../models/reward');
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
        "email": req.query.email
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
        Reward.find({
            "user": req.query.username
        }, function(err, rewards){
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            };
            res.status(200).json({
                message: 'Success',
                obj: rewards
            });
        });
    });
});

router.get('/:rewardName', function (req, res, next) {
    User.findOne({
        "username": req.query.username
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        };
        Reward.findOne({
            "user": req.query.username,
            "name": req.params.rewardName
        }, function (err, reward) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            };
            res.status(200).json({
                message: 'Success',
                obj: reward
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
          Reward.findOne({
              "user": req.query.username,
              "name": req.body.name
          }, function (err, reward) {
              if (reward) {
                return res.status(500).json({
                    title: 'An error occurred, reward may already exist',
                    error: err
                });
            };
            var reward = new Reward ({
                name: req.body.name,
                points: req.body.points,
                claimed: false,
                description: req.body.description,
                user: req.query.username
            });
            reward.save(function(err, result) {
                if (err) {
                    return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                    });
                }
                res.status(201).json({
                    message: 'Reward created',
                    obj: result
                });
            });       
        });   
    });
});

router.patch('/claim/:rewardName', function ( req, res, next) {
    User.findOne({
        "username": req.query.username
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        };
        Reward.findOne({
            "name": req.params.rewardName,
            "user": req.query.username
        }, function (err, reward) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            };
            if(!reward){
                return res.status(500).json({
                    title: 'No reward found',
                    error: {message: 'Reward not found'}
                });
            }
            reward.claimed = req.body.changeClaim;
              
            reward.save(function(err,result){
                if(err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Updated reward',
                    obj: result
                });
            });
        });
    });
});

router.patch('/edit/:rewardName', function ( req, res, next) {
    User.findOne({
        "username": req.query.username
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        };
        Reward.findOne({
            "name": req.params.rewardName,
            "user": req.query.username
        }, function (err, reward) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            };
            if(!reward){
                return res.status(500).json({
                    title: 'No reward found',
                    error: {message: 'Reward not found'}
                });
            };
            reward.name = req.body.name;
            reward.points = req.body.points;
            reward.description = req.body.description;
              
            reward.save(function(err,result){
                if(err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Updated reward',
                    obj: result
                });
            });
        });
    });
});

router.delete('/:rewardName', function (req, res, next) {
    User.findOne({
        "username": req.query.username
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        };
        Reward.findOne({
            "name": req.params.rewardName,
            "user": req.query.username
        }, function (err, reward) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            };
            if(!reward){
                return res.status(500).json({
                    title: 'No reward found',
                    error: {message: 'Reward not found'}
                });
            }
            reward.remove(function (err, result){
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Deleted reward',
                    obj: result
                });
            })
        });
    });
});

module.exports = router;