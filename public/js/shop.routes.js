module.exports = angular.module('shop.routes',['ui.router'])
    .run(['$rootScope','$state',  function ($rootScope,$state) {
        $rootScope.$state = $state;
    }])
    .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
        if (window.location.port !== "8011") {
            $locationProvider.html5Mode(true);
        }
        $urlRouterProvider.otherwise('/');
        // HOME STATES AND NESTED VIEWS ========================================
        $stateProvider
            .state('site', {
                abstract: true,
                template: '<div ui-view></div>',
                controller: 'mainController'
            })
            .state('root', {
                url: '/',
                template: '<h1>Welcome to Products shop</h1><div ui-view></div>',
            })
            .state('site.products', {

                url: '/products',
                templateUrl: 'partials/index.html'
            })
            // nested list with custom controller
            //.state('site.about', {
            //    url: '/about',
            //    template: require('../partials/about.pug')
            //})
            .state('site.cart', {
                url: '/cart',
                templateUrl: 'partials/cart.html'
            })
    })

    .controller('mainController', function ($http, ngCart, $scope) {
        ngCart.setShipping(10.99);
        ngCart.setTaxRate(13);

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

