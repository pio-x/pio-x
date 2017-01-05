var backendApp = angular.module('backendApp', ['monospaced.qrcode'])
    .controller('QRCtrl', function($scope, apiService){
        apiService.get('/team?hash=admin').then(function(articlesResponse) {
            $scope.groups = articlesResponse.data;
        });
        apiService.get('/mrx?hash=admin').then(function(articlesResponse) {
            $scope.mrxs = articlesResponse.data;
        });
        $scope.qrUrl = "https://app.pio-x.ch/login.html?team=1&hash=111";
    })
    .controller('teamCtrl', function($scope, apiService){
        apiService.get('/team?hash=admin').then(function(articlesResponse) {
            $scope.groups = articlesResponse.data;
        });
    })
    .controller('mainCtrl', function($scope, apiService){
            $scope.loggedIn = false;
            $scope.showLogin = false;
            $scope.hash = 'admin';
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
                var domain = '.pio-x.ch';
                if(window.location.host == "localhost") {
                    domain = 'localhost';
                }
                document.cookie = "piox_hash=" + hash + "; path=/; domain=" + domain;
                $scope.checkLogin();
            };
            $scope.logout = function() {
                var domain = '.pio-x.ch';
                if(window.location.host == "localhost") {
                    domain = 'localhost';
                }
                document.cookie = "piox_hash=; path=/; domain=" + domain;
                $scope.checkLogin();
            };
    });