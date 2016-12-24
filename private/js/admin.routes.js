module.exports = angular.module('admin.routes', ['ui.router', 'restangular'])


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
            .state('admin.interface', {
                url: '/interface',
                template: '<interface></interface>'
            })
            .state('admin.interface.about', {
                url: '/about',
                template: '<interface-about></interface-about>'
            })
            .state('admin.interface.main', {
                url: '/main',
                template: '<interface-main></interface-main>'
            })
            .state('admin.products', {
                url: '/products',
                controller: 'dataController',
                template: '<products products="products"></products>'
            })
            .state('admin.product', {
                url: '/products/:datumId',
                controller: 'datumController',
                template: '<products-product></products-product>'
            })
            .state('admin.purchases', {
                url: '/purchases',
                template: '<purchases></purchases>'
            })
            .state('admin.settings', {
                url: '/settings',
                template: '<settings></settings>'
            })
            .state('admin.tariff', {
                url: '/tariff',
                template: '<tariff></tariff>'
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