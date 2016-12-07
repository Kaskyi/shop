var UserModel = require('./UserModel.js');
var ProductModel = require('./ProductModel.js');
var admin = {
    username: 'admin',
    password : 'admin'
}
var products = [{
    "price": 123,
    "imageUrl": "http://ngcart.snapjay.com/img/phones/motorola-xoom-with-wi-fi.0.jpg",
    "name": "Motorola XOOM™ with Wi-Fi",
    "snippet": "The Next, Next Generation Experience the future with Motorola XOOM with Wi-Fi, the world's first tablet powered by Android 3.0 (Honeycomb)."
}, {
    "price": 123,
    "imageUrl": "http://ngcart.snapjay.com/img/phones/motorola-xoom.0.jpg",
    "name": "MOTOROLA XOOM™",
    "snippet": "The Next, Next Generation Experience the future with MOTOROLA XOOM, the world's first tablet powered by Android 3.0 (Honeycomb)."
}, {
    "price": 123,
    "carrier": "AT&T",
    "imageUrl": "http://ngcart.snapjay.com/img/phones/motorola-atrix-4g.0.jpg",
    "name": "MOTOROLA ATRIX™ 4G",
    "snippet": "MOTOROLA ATRIX 4G the world's most powerful smartphone."
}, {
    "price": 123,
    "imageUrl": "http://ngcart.snapjay.com/img/phones/dell-streak-7.0.jpg",
    "name": "Dell Streak 7",
    "snippet": "Introducing Dell™ Streak 7. Share photos, videos and movies together. It’s small enough to carry around, big enough to gather around."
}, {
    "price": 123,
    "carrier": "Cellular South",
    "imageUrl": "http://ngcart.snapjay.com/img/phones/samsung-gem.0.jpg",
    "name": "Samsung Gem™",
    "snippet": "The Samsung Gem™ brings you everything that you would expect and more from a touch display smart phone – more apps, more features and a more affordable price."
}, {
    "price": 123,
    "carrier": "Dell",
    "imageUrl": "http://ngcart.snapjay.com/img/phones/dell-venue.0.jpg",
    "name": "Dell Venue",
    "snippet": "The Dell Venue; Your Personal Express Lane to Everything"
}];

function addAdminToDB() {
    UserModel.find({
        username: admin.username
    }, function(err, user) {
        if (err || !user || user.length == 0) {
            var newUser = new UserModel(admin);
            newUser.save(function(err, user) {
                if (err) return console.error(err);
                else {
                    console.info("New user - %s:%s", newUser.username, user.password);
                    return;
                }
            });
        } else
            return;
    }).limit(1);
}



function addProductsToDB() {
    ProductModel.find({
        name: products[0].name
    }, function(err, user) {
        if (err || !user || user.length == 0) {
            admin.password = 'admin';
            for (var i = 0; i < products.length; i++) {
                var newUser = new ProductModel(products[i]);
                newUser.save(function(err, user) {
                    if (err) return console.error(err);
                    else {
                        console.info("New product - %s:%s", newUser.name, newUser.price);
                        return;
                    }
                });
            }
        } else
            return;
    }).limit(1);
}



﻿
module.exports = function(db) {
    addAdminToDB();
    addProductsToDB();
}
