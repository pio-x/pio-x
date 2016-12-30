angular.module('backendApp', [])
    .controller('QRCtrl', function($scope, $http){
        $http.get('https://api.pio-x.ch/index.php/team').then(function(articlesResponse) {
            $scope.qrCodes = articlesResponse.data;
        });
});