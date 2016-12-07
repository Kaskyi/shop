//TODO seperate to different files
//

//module.exports =
 angular.module('shop.directives', 'shop')

.controller('CartController', ['$scope', 'shop', function($scope, shop) {
    $scope.shop = shop;
}])

.directive('ngcartAddtocart', ['shop', function(shop) {
    return {
        restrict: 'E',
        controller: 'CartController',
        scope: {
            id: '@',
            name: '@',
            quantity: '@',
            quantityMax: '@',
            price: '@',
            data: '='
        },
        transclude: true,
        template: function(element, attrs) {
            if (typeof attrs.template == 'undefined') {
                return require('../templates/ngCart/addtocart.pug');
            } else {
                return attrs.template;
            }
        },
        link: function(scope, element, attrs) {
            scope.attrs = attrs;
            scope.inCart = function() {
                return ngCart.getItemById(attrs.id);
            };

            if (scope.inCart()) {
                scope.q = ngCart.getItemById(attrs.id).getQuantity();
            } else {
                scope.q = parseInt(scope.quantity);
            }

            scope.qtyOpt = [];
            for (var i = 1; i <= scope.quantityMax; i++) {
                scope.qtyOpt.push(i);
            }

        }

    };
}])

.directive('ngcartCart', [function() {
    return {
        restrict: 'E',
        controller: 'CartController',
        scope: {},
        template: function(element, attrs) {
            if (typeof attrs.template == 'undefined') {
                return require('../templates/ngCart/cart.pug');
            } else {
                return attrs.template;
            }
        },
        link: function(scope, element, attrs) {

        }
    };
}])

.directive('ngcartSummary', [function() {
    return {
        restrict: 'E',
        controller: 'CartController',
        scope: {},
        transclude: true,
        template: function(element, attrs) {
            if (typeof attrs.template == 'undefined') {
                return require('../templates/ngCart/summary.pug');
            } else {
                return attrs.template;
            }
        }
    };
}])

.directive('ngcartCheckout', [function() {
    return {
        restrict: 'E',
        controller: ('CartController', ['$rootScope', '$scope', 'ngCart', 'fulfilmentProvider', function($rootScope, $scope, ngCart, fulfilmentProvider) {
            $scope.ngCart = ngCart;

            $scope.checkout = function() {
                fulfilmentProvider.setService($scope.service);
                fulfilmentProvider.setSettings($scope.settings);
                fulfilmentProvider.checkout()
                    .success(function(data, status, headers, config) {
                        $rootScope.$broadcast('ngCart:checkout_succeeded', data);
                    })
                    .error(function(data, status, headers, config) {
                        $rootScope.$broadcast('ngCart:checkout_failed', {
                            statusCode: status,
                            error: data
                        });
                    });
            }
        }]),
        scope: {
            service: '@',
            settings: '='
        },
        transclude: true,
        template: function(element, attrs) {
            if (typeof attrs.template == 'undefined') {
                return require('../templates/ngCart/checkout.pug');
            } else {
                return attrs.template;
            }
        }
    };
}]);
