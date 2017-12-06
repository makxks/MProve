var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    points: {type: Number, required: true},
    claimed: {type: Boolean, required: true},
    user: {type: String, required: true},
    description: {type: String, required: false}
})

module.exports = mongoose.model('Reward', schema);