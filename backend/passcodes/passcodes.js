var backendApp = angular.module('backendApp', ['monospaced.qrcode', 'ngMap'])
    //QR CODES
    .controller('QRViewCtrl', function($scope, apiService){
        apiService.get('/team').then(function(articlesResponse) {
            $scope.groups = articlesResponse.data;
        });
        apiService.get('/mrx').then(function(articlesResponse) {
            $scope.mrxs = articlesResponse.data;
        });
        $scope.qrUrl = {
            team: "",
            link: ""
        };
        $scope.showQR = function(id, name, hash, type) {
            $scope.qrUrl.team = name;
            $scope.qrUrl.link = 'https://app.pio-x.ch/login.html?' + type +'=' + id + '&hash=' + hash;
        };
    })