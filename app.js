var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');
var targetRoutes = require('./routes/target');
var subtargetRoutes = require('./routes/subtarget');
var rewardRoutes = require('./routes/reward');

var app = express();
var prodDB = 'mongodb://makks:M0nument@ds123556.mlab.com:23556/mprove';
var localDB = 'localhost:27017/mprove';

mongoose.connect(prodDB, { useMongoClient: true });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon-16x16.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/user', userRoutes);
app.use('/target', targetRoutes);
app.use('/subtarget', subtargetRoutes);
app.use('/reward', rewardRoutes);
app.use('/', appRoutes);

app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;