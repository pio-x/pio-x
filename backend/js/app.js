angular.module('backendApp', ['monospaced.qrcode'])
    .controller('QRCtrl', function($scope, $http){
        $http.get('https://api.pio-x.ch/index.php/team?hash=admin').then(function(articlesResponse) {
            $scope.groups = articlesResponse.data;
        });
        $http.get('https://api.pio-x.ch/index.php/riddle?hash=admin').then(function(articlesResponse) {
            $scope.riddles = articlesResponse.data;
        });
        $http.get('https://api.pio-x.ch/index.php/station?hash=admin').then(function(articlesResponse) {
            $scope.stations = articlesResponse.data;
        });
        $scope.qrUrl = "https://app.pio-x.ch/login.html?team=1&hash=111";
});