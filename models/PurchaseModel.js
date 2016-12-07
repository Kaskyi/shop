var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Purchase = new Schema({
    username: { type: String},
    mobilePhone: { type: String, required: true },
    dataOrder: { type: String, default: ''},
    state: { type: String, required: true, default: 'wait'},
    product_id: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

// validation
Purchase.path('mobilePhone').validate(function (v) {
    return v.length > 1 && v.length < 15;
});



var PurchaseModel = mongoose.model('Purchase', Purchase);
module.exports = PurchaseModel;
