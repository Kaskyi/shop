
angular.module('root',['shop','shop.routes']);
require('./js/shop.directives');
require('./js/shop.components');
require('./js/shop');
require('./js/shop.routes');

require('!style-loader!css-loader!sass-loader!./sass/style.sass');
require('!style-loader!css-loader!./sass/styles.css');