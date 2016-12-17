'use strict';
//noinspection JSUnresolvedFunction
module.exports = angular.module('shop.directives', [])
    .controller('CartController', ['$scope', 'ngCart', function ($scope, ngCart) {
        $scope.ngCart = ngCart;
    }])
    .directive('shopHeader', [function () {
        return {
            restrict: 'E',
            controller: 'CartController',
            scope: {},
            transclude: true,
            template: require('../templates/header.pug')
        };
    }])
    .directive('shopFooter', [function () {
        return {
            restrict: 'E',
            controller: 'CartController',
            scope: {},
            transclude: true,
            template: require('../templates/footer.pug')
        };
    }])
    .directive('ngcartAddtocart', ['ngCart', function (ngCart) {
        return {
            restrict: 'E',
            controller: 'CartController',
            scope: {
                product: '=product',
                quantity: '@',
                quantityMax: '@',
                data: '='
            },
            transclude: true,
            template: function (element, attrs) {
                if (typeof attrs.templateUrl == 'undefined') {
                    return require('../templates/directives/addtocart.pug');
                } else {
                    return attrs.templateUrl;
                }
            },
            link: function (scope, element, attrs) {
                scope.attrs = attrs;
                scope.inCart = function () {
                    return ngCart.getItemById(scope.product._id);
                };

                if (scope.inCart()) {
                    scope.q = ngCart.getItemById(scope.product._id).getQuantity();
                } else {
                    scope.q = parseInt(scope.quantity);
                }

                scope.qtyOpt = [];
                for (var i = 1; i <= scope.quantityMax; i++) {
                    scope.qtyOpt.push(i);
                }
                scope.addToCard = function () {
                    ngCart.addItem(scope.product._id, scope.product.name, scope.product.price, scope.q, scope.data);
                }

            }

        };
    }])

    .directive('ngcartCart', [function () {
        return {
            restrict: 'E',
            controller: 'CartController',
            scope: {},
            template: function (element, attrs) {
                if (typeof attrs.templateUrl == 'undefined')return require('../templates/directives/cart.pug');
                else return attrs.templateUrl;
            },
            link: function (scope, element, attrs) {

            }
        };
    }])

    .directive('ngcartSummary', [function () {
        return {
            restrict: 'E',
            controller: 'CartController',
            scope: {},
            transclude: true,
            template: function (element, attrs) {
                if (typeof attrs.templateUrl == 'undefined') {
                    return require('../templates/directives/summary.pug');
                } else {
                    return attrs.templateUrl;
                }
            }
        };
    }])

    .directive('ngcartCheckout', [function () {
        return {
            restrict: 'E',
            controller: ('CartController', ['$rootScope', '$scope', 'ngCart', 'fulfilmentProvider', function ($rootScope, $scope, ngCart, fulfilmentProvider) {
                $scope.ngCart = ngCart;

                /* $scope.checkout = function () { // TODO : fulfilmentProvider
                 fulfilmentProvider.setService($scope.service);
                 fulfilmentProvider.setSettings($scope.settings);
                 fulfilmentProvider.checkout()
                 .success(function (data, status, headers, config) {
                 $rootScope.$broadcast('ngCart:checkout_succeeded', data);
                 })
                 .error(function (data, status, headers, config) {
                 $rootScope.$broadcast('ngCart:checkout_failed', {
                 statusCode: status,
                 error: data
                 });
                 });
                 }*/
            }]),
            scope: {
                service: '@',
                settings: '='
            },
            transclude: true,
            template: function (element, attrs) {
                if (typeof attrs.templateUrl == 'undefined') {
                    return require('../templates/directives/checkout.pug');
                } else {
                    return attrs.templateUrl;
                }
            }
        };
    }]);
