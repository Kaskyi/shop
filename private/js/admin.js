module.exports = angular.module('admin', ['admin.routes'])
    .directive('ngHeader', [function () {
        return {
            restrict: 'E',
            scope: {},
            transclude: true,
            template: require('../templates/header.pug'),
            link: function (scope) {
                scope.toggleSideNav = function () {
                    $("#wrapper").toggleClass("toggled");
                }
            }
        };
    }])
    .directive('ngSidebar', [function () {
        return {
            restrict: 'E',
            transclude: true,
            template: require('../templates/sidebar.pug')
        };
    }])
    .directive('ngFooter', [function () {
        return {
            restrict: 'E',
            transclude: true,
            template: require('../templates/footer.pug')
        };
    }])
.value('version', '1.0.0');