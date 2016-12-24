var path = require('path');
var router = require('express').Router();
var UserModel = require('../models').UserModel;
var ProductModel = require('../models').ProductModel;
var PurchaseModel = require('../models').PurchaseModel;
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


router.post('/products-new', ensureLoggedIn('/login'), function(req, res) {
    ProductModel.find({
        name: req.body.name
    }, function(err, user) {
        if (err || !user || user.length == 0) {
            var newProduct = new ProductModel(req.body);
            newProduct.save(function(err, product) {
                if (err) return console.error(err);
                else {
                    console.info("New product - %s", product.name);
                    return res.redirect('/admin');
                }
            });
        } else
            return res.redirect('/admin');
    }).limit(1);
});
router.put('/products', function (req, res) {
    console.log('Save :' + req.body._id);

});
router.get('/products', function (req, res) {
    ProductModel.find({}, function (err, products) {
        if (err || !products)
            return res.json('null');
        else
            return res.json(products);
    });
});

router.get('/products/:id', ensureLoggedIn('/login'), function(req, res) {
    ProductModel.find({
        name: req.params.id
    }, function(err, products) {
        if (err || !products) {
            return res.json(null);
        }
        return res.json(products[0]);
    }).limit(1);
});

router.get('/purchases', ensureLoggedIn('/login'), function(req, res) {
    PurchaseModel.find({}, function(err, purchases) {
        if (err || !purchases) {
            return res.json(null);
        }
        return res.json(purchases);
    });
});
module.exports = router;
