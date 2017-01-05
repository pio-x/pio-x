var backendApp = angular.module('backendApp', ['monospaced.qrcode'])
    .controller('QRCtrl', function($scope, apiService){
        apiService.get('/team?hash=admin').then(function(articlesResponse) {
            $scope.groups = articlesResponse.data;
        });
        apiService.get('/mrx?hash=admin').then(function(articlesResponse) {
            $scope.mrxs = articlesResponse.data;
        });
        apiService.get('/riddle?hash=admin').then(function(articlesResponse) {
            $scope.riddles = articlesResponse.data;
        });
        apiService.get('/station?hash=admin').then(function(articlesResponse) {
            $scope.stations = articlesResponse.data;
        });
        $scope.qrUrl = "https://app.pio-x.ch/login.html?team=1&hash=111";
});