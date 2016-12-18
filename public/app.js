
angular.module('root',['shop']);
require('./js/shop.directives');
require('./js/shop.components');
require('./js/shop.resources');
require('./js/shop');
require('./js/shop.routes');

require('!style-loader!css-loader!sass-loader!./sass/style.sass');
require('!style-loader!css-loader!sass-loader!./sass/products-product.sass');
require('!style-loader!css-loader!./sass/styles.css');