module.exports = angular.module('admin', ['admin.routes'])
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
.value('version', '1.0.0');