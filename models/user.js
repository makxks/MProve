var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    points: {type: Number, required: true},
    rewardsClaimed: {type: Number, required: true},
    targetsReached: {type: Number, required: true},
    totalPointsEarned: {type: Number, required: true}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);