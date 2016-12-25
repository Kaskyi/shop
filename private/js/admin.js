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
    .directive('ngImageLoad', [function () {
        return {
            restrict: 'E',
            scope: {
                src: '='
            },
            template: '<img class="img-responsive" ng-src="{{src}}" alt="File Image are not selected"/></div>' +
            '<input type="file"  onchange="angular.element(this).scope().uploadImage(this.files)"/>',
            link: function (scope) {
                scope.imageIsLoaded = function (e) {
                    scope.$apply(function () {
                        scope.src = e.target.result;
                    });
                };
                scope.uploadImage = function (files) {
                    // FileReader support
                    if (FileReader && files && files.length) {
                        var reader = new FileReader();
                        reader.onload = scope.imageIsLoaded;
                        reader.readAsDataURL(files[0]);
                    }
                    else {
                        console.log("Not support");
                    }
                };
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