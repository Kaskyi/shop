var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    snippet :  { type: String, default: ''},
    description: { type: String, default: ''},
    imageUrl: { type: String, required: true },
    sale: { type: Number, default: 0 }
});

// validation
Product.path('name').validate(function (v) {
    return v.length > 1 && v.length < 70;
});
Product.path('sale').validate(function (v) {
    return true;
});
Product.path('description').validate(function (v) {
    return true;
});
Product.path('price').validate(function (v) {
    return true;
});


var ProductModel = mongoose.model('Product', Product);
module.exports = ProductModel;
