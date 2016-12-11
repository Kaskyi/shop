var router = require('express').Router();
var UserModel = require('../models').UserModel;
var ProductModel = require('../models').ProductModel;
var PurchaseModel = require('../models').PurchaseModel;
var path = require('path');
//https://github.com/chriso/validator.js

router.get('/', function(req, res) {
    return res.sendFile(path.join(__dirname ,'../public/index.html'));
});
router.get('/products', function(req, res) {
    return res.sendFile(path.join(__dirname , '../public/index.html'));
});
router.get('/products/*', function(req, res) {
    return res.sendFile(path.join(__dirname , '../public/index.html'));
});
router.get('/cart', function(req, res) {
      return res.sendFile(path.join(__dirname ,'../public/index.html'));
});
router.get('/about', function(req, res) {
  return res.render('admin-about-as');//TODO CREATE public about as or fix angular ng-map
});
//TODO add validate the post data
router.post('/order', function(req, res) {
    var newPurchase = new PurchaseModel(req.body);
    newPurchase.save(function(err, purchase) {
        if (err) return console.error(err);
        else {
            console.info("New purchase - %s", purchase.name);
            return res.redirect('/');
        }
    });
});


module.exports = router;
