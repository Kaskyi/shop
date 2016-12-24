module.exports = angular.module('admin.routes', ['ui.router','restangular'])


    .run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.$state = $state;
    }])
    .config(function (RestangularProvider) {
        RestangularProvider.setBaseUrl('http://localhost:8080/local/v1');
        //RestangularProvider.setExtraFields(['username','password']);
        RestangularProvider.setDefaultHttpFields({cache: true});
    })
    .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
        if (window.location.port !== "8011") {
            $locationProvider.html5Mode(true);
        }
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('admin', {
                url: '',
                template: '<div ui-view></div>',
                controller: 'mainController'
            })
            .state('root', {
                abstract: true,
                template: '<div ui-view></div>',
                controller: 'mainController'
            })
            .state('admin.products', {
                url: '/products',
                template: require('../templates/admin-products.pug')
            })
            .state('admin.about-as', {
                url: '/about-as',
                template: require('../templates/admin-about-as.pug')
            })
            .state('admin.products-new', {
                url: '/products-new',
                template: require('../templates/admin-create-product.pug')
            })
            .state('admin.data', {
                url: '/data',
                template: require('../templates/admin-products.pug'),
                controller:'dataController'
            })
            .state('admin.datum', {
                url: '/data/:datumId',
                template: require('../templates/admin-product-details.pug'),
                controller:'datumController'
            })
            .state('admin.purchases', {
                url: '/purchases',
                template: require('../templates/admin-purchases.pug')
            })
            .state('admin.settings', {
                url: '/settings',
                template: require('../templates/admin-settings.pug')
            })
            .state('logout', {
                url: '/'
            })
    })
    .controller('datumController', function ($scope, $stateParams, Restangular) {
        Restangular.all('products', $stateParams.datumId).getList().then(function (products) {
            $scope.product = products[0];
        });
    })
    .controller('dataController', function ($scope, Restangular) {
        Restangular.all('products').getList().then(function (products) {
            $scope.products = products;
        });
    })
    .controller('mainController', function ($scope) {

    })
;