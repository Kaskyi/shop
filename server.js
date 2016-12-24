//nodejs
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
var adminRouter = require('./routes/admin');
var basicRouter = require('./routes/basic-api');
var publicRouter = require('./routes/public-api');
var oauth2Router = require('./routes/oauth2-api');

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
app.use('/admin', express.static(path.join(__dirname, 'private')));

// database
app.use(models());

var oauth2 = require('./libs/oauth2');
//security and api
app.use(passport.initialize());
app.use(passport.session());
require('./libs/passwordAuth.js');

app.use('/api/v1/', publicRouter);
app.use('/local/v1/',ensureLoggedIn('/login'), basicRouter);

app.use('/basic/v1/', passport.authenticate('basic', { session: false }), basicRouter);//ssl

app.post('/oauth2/token', oauth2.token);
app.use('/oauth2/v1/', passport.authenticate('bearer', { session: false }), oauth2Router);//ssl

app.get('/userInfo',
    passport.authenticate('bearer', { session: false }),
    function(req, res) {
        // req.authInfo is set using the `info` argument supplied by
        // `BearerStrategy`.  It is typically used to indicate a scope of the token,
        // and used in access control checks.  For illustrative purposes, this
        // example simply returns the scope in the response.
        res.json({ user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope })
    }
);
app.use('/admin', ensureLoggedIn('/login'), adminRouter);
app.all('/admin/*', ensureLoggedIn('/login'), function (req, res, next) {
    next();
});
app.get('/login', function (req, res) {
    return res.render('login');
});
// IF creeate a app server where clients wiil be edit their own db or better sepperate to each user ? 

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login' //Return message
    }),
    function(req, res) {
        console.log("HERE");
        res.redirect('/login');
    }
);

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});
app.use('/', indexRouter);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.end('err 404');
});

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
