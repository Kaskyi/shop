module.exports = angular.module('admin', ['ui.router'])
    .component('productsProduct', {
        template: require('../templates/components/products-product.pug'),
        bindings: { product: '<' }
    })
    .directive('shopHeader', [function () {
        return {
            restrict: 'E',
            scope: {},
            transclude: true,
            template: require('../templates/header.pug')
        };
    }])
    .directive('shopFooter', [function () {
        return {
            restrict: 'E',
            transclude: true,
            template: require('../templates/footer.pug')
        };
    }])
    .run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.$state = $state;
    }])
    .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
        if (window.location.port !== "8011") {
            $locationProvider.html5Mode(true);
        }
        $urlRouterProvider.otherwise('/admin');
        $stateProvider
            .state('admin', {
                url: '/admin',
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

    .controller('mainController', function ($http, $scope) {


        if (!$scope.products)
            $http({
                method: 'GET',
                url: '/api/products'
            })
                .success(function (data, status, headers, config) {

                    $scope.products = data;
                })
                .error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
    })



.value('version', '1.0.0');