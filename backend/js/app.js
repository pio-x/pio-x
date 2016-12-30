angular.module('backendApp', ['monospaced.qrcode'])
    .controller('QRCtrl', function($scope, $http){
        $http.get('https://api.pio-x.ch/index.php/team').then(function(articlesResponse) {
            $scope.groups = articlesResponse.data;
        });
        $http.get('https://api.pio-x.ch/index.php/riddle').then(function(articlesResponse) {
            $scope.riddles = articlesResponse.data;
        });
        $scope.qrUrl = "https://app.pio-x.ch/login.html?team=1&hash=111";
});