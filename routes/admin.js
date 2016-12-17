var path = require('path');
var router = require('express').Router();
var UserModel = require('../models').UserModel;
var ProductModel = require('../models').ProductModel;
var PurchaseModel = require('../models').PurchaseModel;
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
//db.collection.find( { field: { $gt: value1, $lt: value2 } } ); FROM TO
router.get('/', ensureLoggedIn('/login'), function(req, res) {
    return res.sendFile(path.join(__dirname ,'../private/index.html'));
});

router.get('/products-new', ensureLoggedIn('/login'), function(req, res) {
    return res.render('admin-create-product');
});
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
router.get('/products/:id', ensureLoggedIn('/login'), function(req, res) {
    ProductModel.find({
        name: req.params.id
    }, function(err, products) {
        if (err || !products) {
            return res.redirect('/admin');
        }
        return res.render('product-details', { //TODO
            product: products[0]
        });
    }).limit(1);
});
router.get('/about-as', ensureLoggedIn('/login'), function(req, res) {
    return res.render('admin-about-as');
});
router.get('/settings', ensureLoggedIn('/login'), function(req, res) {
    return res.render('admin-settings');
});
router.get('/purchases', ensureLoggedIn('/login'), function(req, res) {
  ProductModel.find({}, function(err, purchases) {
      if (err || !purchases) {
          return res.redirect('/admin');
      }
      return res.render('admin-purchases', {
          purchases: purchases
      });
  });

});
module.exports = router;
