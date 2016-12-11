var router = require('express').Router();
var UserModel = require('../models').UserModel;
var ProductModel = require('../models').ProductModel;
var PurchaseModel = require('../models').PurchaseModel;

router.get('/products', function (req, res) {

    var form = req.query.from;
    var to = req.query.to;
    if (form && to)
        ProductModel.find({}, function (err, products) {
            if (err || !products)
                return res.json('null');
            else
                return res.json(products);
        });
    else
        ProductModel.find({}, function (err, products) {
            if (err || !products)
                return res.json('null');
            else
                return res.json(products);
        });
});

router.get('/products/:id', function (req, res) {
    ProductModel.find({
        name: req.params.id
    }, function (err, products) {
        if (err || !products) {
            return res.json('null');
        }
        return res.json(product);
    }).limit(1);
});

module.exports = router;
