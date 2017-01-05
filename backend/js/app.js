var backendApp = angular.module('backendApp', ['monospaced.qrcode'])
    .controller('QRCtrl', function($scope, apiService){
        apiService.get('/team').then(function(articlesResponse) {
            $scope.groups = articlesResponse.data;
        });
        apiService.get('/mrx').then(function(articlesResponse) {
            $scope.mrxs = articlesResponse.data;
        });
        $scope.qrUrl = "https://app.pio-x.ch/login.html?team=1&hash=111";
    })
    .controller('teamCtrl', function($scope, apiService){
        apiService.get('/team').then(function(articlesResponse) {
            $scope.groups = articlesResponse.data;
        });
    })
    .controller('mainCtrl', function($scope, $rootScope, apiService){
        $scope.loggedIn = false;
        $scope.showLogin = false;
        $scope.hash = 'admin'; //TODO empty string on production
        $scope.checkLogin = function(){
            apiService.get('/team').then(function(success) {
                $scope.loggedIn = true;
            })
            .catch(function(error) {
                $scope.showLogin = true;
                $scope.loggedIn = false;
            });
        };
        $scope.checkLogin();
        $scope.login = function(hash) {
            $rootScope.rHash = hash;
            $scope.checkLogin();
        };
        $scope.logout = function() {
            $rootScope.rHash = '';
            $scope.checkLogin();
        };
    });