/**
 * Created by user on 12/11/16.
 */
module.exports = angular.module('shop.components', [])


    .component('productsProduct', {
        template: require('../templates/components/products-product.pug'),
        bindings: { product: '<' }
    });
;