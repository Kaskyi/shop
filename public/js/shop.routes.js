module.exports = angular.module('shop.routes', ['ui.router'])
    .run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.$state = $state;
    }])
    .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
        if (window.location.port !== "8011") {
            $locationProvider.html5Mode(true);
        }
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('root', {
                url: '/',
                template: require('../partials/root.pug')
            })
            .state('site', {
                abstract: true,
                template: '<div ui-view></div>',
                controller: 'mainController'
            })
            .state('site.products', {
                url: '/products',
                template: require('../partials/products.pug')
            })
            .state('site.about', {
                url: '/about',
                template: require('../partials/about.pug')
            })
            .state('site.cart', {
                url: '/cart',
                template: require('../partials/cart.pug')
            })
    })

    .controller('mainController', function ($http, ngCart, $scope) {
        ngCart.setShipping(10.99);
        ngCart.setTaxRate(13);

        if (!$scope.products)
            $http({
                method: 'GET',
                url: 'api/products'
            })
                .success(function (data, status, headers, config) {

                    $scope.products = data;
                })
                .error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
    });
;

