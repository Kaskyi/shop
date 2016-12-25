module.exports = angular.module('admin', ['admin.routes'])
    .directive('ngHeader', [function () {
        return {
            restrict: 'E',
            transclude: true,
            template: require('../templates/directives/header.pug')
        };
    }])
    .directive('ngToggle', [function () {
        return {
            restrict: 'C',
            scope: {
                target: "@"
            },
            link: function (scope, element) {
                element.on('click', function () {
                    $(scope.target).toggleClass("toggled");
                });
            }
        };
    }])
    .directive('ngSidebar', [function () {
        return {
            restrict: 'E',
            transclude: true,
            template: require('../templates/directives/sidebar.pug')
        };
    }])
    .directive('ngFooter', [function () {
        return {
            restrict: 'E',
            transclude: true,
            template: require('../templates/directives/footer.pug')
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
        template: require('../templates/products-product.pug'),
        bindings: {
            product: '='
        }
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