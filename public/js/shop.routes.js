module.exports = angular.module('shop.routes', ['ui.router', 'restangular'])
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
    .config(function (RestangularProvider) {
        RestangularProvider.setBaseUrl('http://localhost:8080/api/v1');
        RestangularProvider.setDefaultHttpFields({cache: true});

        console.log('shop config loaded');
    })

    .controller('mainController', function ($http, ngCart, $scope, Restangular) {
        ngCart.setShipping(10.99);
        ngCart.setTaxRate(13);

        var baseAccounts = Restangular.all('products');
        //   Restangular.one('thing', 123).withHttpConfig({ cache: true}).get().then(function (thing) {
        //     return thing;
        //});
        baseAccounts.getList().then(function (products) {
            $scope.products = products;
        });


    });
;

