var router = require('express').Router();
var UserModel = require('../models').UserModel;
var ProductModel = require('../models').ProductModel;
var PurchaseModel = require('../models').PurchaseModel;

router.get('/products', function (req, res) {
    ProductModel.find({}, function (err, products) {
        if (err || !products)
            return res.json('null');
        else
            return res.json(products);
    });
});

router.get('/products/:id', function (req, res) {
    ProductModel.find({
        _id: req.params.id
    }, function (err, products) {
        if (err || !products) {
            return res.json('null');
        }
        return res.json(products);
    }).limit(1);
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
