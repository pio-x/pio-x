angular.module('backendApp', [])
    .controller('QRCtrl', function($scope, $http){
        $http.get('https://api.pio-x.ch/index.php/team').then(function(articlesResponse) {
            $scope.groups = articlesResponse.data;
        });
        $http.get('https://api.pio-x.ch/index.php/riddle').then(function(articlesResponse) {
            $scope.riddles = articlesResponse.data;
        });
});