var backendApp = angular.module('backendApp', ['monospaced.qrcode', 'ngMap', 'highcharts-ng'])
    .filter('moment', function() {
        return function(dateString, format) {
            return moment(dateString).format(format);
        };
    });
