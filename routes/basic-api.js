var path = require('path');
var router = require('express').Router();
var UserModel = require('../models').UserModel;
var ProductModel = require('../models').ProductModel;
var PurchaseModel = require('../models').PurchaseModel;
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

/*
 * Products
 */
router.get('/products', function (req, res) {
    return ProductModel.find(function (err, products) {
        if (!err) {
            return res.send(products);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
    });
});

router.post('/products', function (req, res) {
    var product
        = new ProductModel({
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        name: req.body.name,
        snippet: req.body.snippet
    });

    product.save(function (err) {
        if (!err) {
            log.info("product created");
            return res.send(product);
        } else {
            console.log(err);
            if (err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({error: 'Validation error'});
            } else {
                res.statusCode = 500;
                res.send({error: 'Server error'});
            }
            log.error('Internal error(%d): %s', res.statusCode, err.message);
        }
    });
});

router.get('/products/:id', function (req, res) {
    return ProductModel.findById(req.params.id, function (err, product) {
        if (!product) {
            res.statusCode = 404;
            return res.send({error: 'Not found'});
        }
        if (!err) {
            return res.send(product);
        } else {
            res.statusCode = 500;
            console.log('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
    });
});

router.put('/products/:id', function (req, res) {
    return ProductModel.findById(req.params.id, function (err, product) {
        if (!product) {
            res.statusCode = 404;
            return res.send({error: 'Not found'});
        }
        product.price = req.body.price;
        product.imageUrl = req.body.imageUrl;
        product.name = req.body.name;
        product.snippet = req.body.snippet;
        return product.save(function (err) {
            if (!err) {
                console.log("product updated");
                return res.send(product);
            } else {
                if (err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({error: 'Validation error'});
                } else {
                    res.statusCode = 500;
                    res.send({error: 'Server error'});
                }
                console.log('Internal error(%d): %s', res.statusCode, err.message);
            }
        });
    });
});

router.delete('/products/:id', function (req, res) {
    return ProductModel.findById(req.params.id, function (err, product) {
        if (!product) {
            res.statusCode = 404;
            return res.send({error: 'Not found'});
        }
     /*   return product.remove(function (err) { // add property as 'Status' = deleted active hide (Do not delete from db!!!)
            if (!err) {
                console.log("product removed");
                return res.send({status: 'OK'});
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({error: 'Server error'});
            }
        });*/
    });
});

/*
 * Purchases
 */
router.get('/purchases', ensureLoggedIn('/login'), function (req, res) {
    PurchaseModel.find({}, function (err, purchases) {
        if (err || !purchases) {
            return res.json(null);
        }
        return res.json(purchases);
    });
});
module.exports = router;
