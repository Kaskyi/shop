var config = require('../libs/config');

var UserModel = require('./UserModel.js');
var ClientModel = require('./ClientModel');
var ProductModel = require('./ProductModel.js');

var user = config.get('default:users')[0];
var client = config.get('default:clients')[0];
var products = config.get('default:products');

function addAdminToDB() {
    UserModel.find({
        username: user.username
    }, function(err, user) {
        if (err || !user || user.length == 0) {
            var newUser = new UserModel(user);
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
function addClientToDB() {
    ClientModel.find({
        clientId: client.clientId
    }, function(err, user) {
        if (err || !user || user.length == 0) {
            var newUser = new ClientModel(client);
            newUser.save(function(err, user) {
                if (err) return console.error(err);
                else {
                    console.info("New client - %s", newUser.clientId);
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




module.exports = function(db) {
    addAdminToDB();
    addClientToDB();
    addProductsToDB();
};
