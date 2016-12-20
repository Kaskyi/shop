﻿var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BasicStrategy = require('passport-http').BasicStrategy;
var UserModel = require('../models').UserModel;

passport.use(new LocalStrategy(
    function (username, password, done) {
        UserModel.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
            if (!user.checkPassword(password)) { return done(null, false, { message: 'Incorrect password.' }); }
            return done(null, user);
        });
    }
));
passport.use(new BasicStrategy(
    function (username, password, done) {
        UserModel.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
            if (!user.checkPassword(password)) { return done(null, false, { message: 'Incorrect password.' }); }
            return done(null, user);
        });
    }
));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function (err, user) {
        done(err, user);
    });
});
