module.exports = angular.module('admin.data', [])
    .component('productsProduct', {
        template: require('../templates/components/products-product.pug'),
        bindings: {product: '<'}
    })
;