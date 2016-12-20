
angular.module('root',['admin','admin.data']);

require('./js/admin.data.directives');
require('./js/admin.data');
require('./js/admin.routes');
require('./js/admin.pages');
require('./js/admin');


require('!style-loader!css-loader!sass-loader!./sass/style.sass');
require('!style-loader!css-loader!sass-loader!./sass/products-product.sass');
require('!style-loader!css-loader!./sass/styles.css');