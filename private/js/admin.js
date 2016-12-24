module.exports = angular.module('admin', ['admin.routes'])
    .directive('ngHeader', [function () {
        return {
            restrict: 'E',
            scope: {},
            transclude: true,
            template: require('../templates/header.pug'),
            link: function (scope) {
                scope.toggleSideNav = function () {
                    $("#wrapper").toggleClass("toggled");
                }
            }
        };
    }])
    .directive('ngSidebar', [function () {
        return {
            restrict: 'E',
            transclude: true,
            template: require('../templates/sidebar.pug')
        };
    }])
    .directive('ngFooter', [function () {
        return {
            restrict: 'E',
            transclude: true,
            template: require('../templates/footer.pug')
        };
    }])
    .component('interface', {
        template: require('../templates/interface.pug')
    })
    .component('interfaceAbout', {
        template: require('../templates/interface-about.pug')
    })
    .component('interfaceMain', {
        template: require('../templates/interface-main.pug')
    })
    .component('products', {
        template: require('../templates/products.pug'),
        bindings: {
            products: '='
        }
    })
    .component('productsProduct', {
        template: require('../templates/products-product.pug')
    })
    .component('purchases', {
        template: require('../templates/purchases.pug')
    })
    .component('settings', {
        template: require('../templates/settings.pug')
    })
    .component('tariff', {
        template: require('../templates/tariff.pug')
    })
    .value('version', '1.0.0');