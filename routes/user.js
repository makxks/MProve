var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.post('/', function (req, res, next) {
  //add a new user to the db, this is done after the user has been added
  //to auth0 so it must be unique on this application on auth0 first
  var user = new User ({
    username: req.body.username,
    email: req.body.email,
    points: 0,
    rewardsClaimed: 0,
    targetsReached: 0,
    totalPointsEarned: 0
  });
  user.save(function(err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(201).json({
      message: 'User created',
      obj: result
    })
  });
});

router.get('/', function (req, res, next){
  User.findOne({
    "email": req.query.email
  }, function (err, user){
    if(err) {
      console.log(err);
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(200).json({
      message: 'Success',
      obj: user
    });
  })
})

router.patch('/points', function (req, res, next) {
  User.findOne({
		"username": req.query.username
	}, function (err, user) {
		if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    };

    user.points += parseInt(req.body.points);
    user.totalPointsEarned += parseInt(req.body.totalPointsChange);
    user.rewardsClaimed += parseInt(req.body.rewardsChange);
    user.targetsReached += parseInt(req.body.targetsChange);
        
    user.save(function(err,result){
      if(err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated user points',
        obj: result
      });
    });
  });
});

module.exports = router;