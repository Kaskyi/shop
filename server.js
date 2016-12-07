﻿ //nodejs
var fs = require('fs');
var http = require('http');
var path = require('path');
var helmet = require('helmet');
//modules
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var express = require('express');
var favicon = require('serve-favicon');
var passport = require('passport');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
//var multer = require('multer');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
//own
var models = require('./models/index.js');
var indexRouter = require('./routes');
var apiRouter = require('./routes/api');
var adminRouter = require('./routes/admin');

var app = express();

// all environments
app.use(helmet());
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'uwotm8'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/private', express.static(path.join(__dirname, 'private')));

// database
app.use(models());

//security and api
app.use(passport.initialize());
app.use(passport.session());
require('./libs/passwordAuth.js');

app.all('/private/*', ensureLoggedIn('/login'), function(req, res, next) {
    next();
});
app.use('/admin', ensureLoggedIn('/'), adminRouter);
app.use('/api', apiRouter);
app.get('/login', function(req, res) {
    return res.render('login');
});
// IF creeate a app server where clients wiil be edit their own db or better sepperate to each user ? 
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login' //Return message
    })
);

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});
app.use('/', indexRouter);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.end('err');
});

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
