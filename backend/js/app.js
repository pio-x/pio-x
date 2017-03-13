var backendApp = angular.module('backendApp', ['monospaced.qrcode', 'ngMap', 'highcharts-ng', 'angularMoment']);

backendApp.filter('moment', function() {
    return function(dateString, format) {
        return moment(dateString).format(format);
    };
});

backendApp.run(function(amMoment) {
    amMoment.changeLocale('de');
});
