﻿var init = require('./init.js');
var ProductModel = require('./ProductModel.js');
var UserModel = require('./UserModel.js');
var PurchaseModel = require('./PurchaseModel.js');
var ClientModel = require('./ClientModel.js');
var AccessTokenModel = require('./AccessTokenModel.js');
var RefreshTokenModel = require('./RefreshTokenModel.js');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shop');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Mongodb connection error:'));
db.once('open', console.log.bind(console, 'Mongodb have been loaded.'));

var _proto = function (req, res, next) {
    return next();
};

module.exports = function (obj) {
    init(db);
    return _proto;
};

module.exports.ProductModel = ProductModel;
module.exports.PurchaseModel = PurchaseModel;
module.exports.UserModel = UserModel;
module.exports.ClientModel = ClientModel;
module.exports.AccessTokenModel = AccessTokenModel;
module.exports.RefreshTokenModel = RefreshTokenModel;