var backendApp = angular.module('backendApp', ['monospaced.qrcode', 'ngMap', 'highcharts-ng', 'angularMoment', 'ui.bootstrap', 'ngSanitize']);

backendApp.filter('moment', function() {
    return function(dateString, format) {
        return moment(dateString).format(format);
    };
});

backendApp.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

backendApp.run(function(amMoment) {
    amMoment.changeLocale('de');
});
