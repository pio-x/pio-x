backendApp.controller('mainCtrl', function($scope, apiService){
    $scope.loggedIn = false;
    $scope.showLogin = false;
    $scope.hash = 'admin'; //TODO empty string on production
    if (localStorage.getItem('api') === null) {
        $scope.api = location.protocol + '//' + location.hostname + ':8083';
    } else {
        $scope.api = localStorage.getItem('api');
    }
    if (localStorage.getItem('frontend') === null) {
        $scope.frontend = location.protocol + '//' + location.hostname + ':8081';
    } else {
        $scope.frontend = localStorage.getItem('frontend');
    }
    $scope.selectedTab = 'map';
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
    $scope.login = function(hash, api, frontend) {
        localStorage.setItem('hash', hash);
        localStorage.setItem('api', api);
        localStorage.setItem('frontend', frontend);
        $scope.checkLogin();
    };
    $scope.logout = function() {
        localStorage.setItem('hash', '');
        $scope.checkLogin();
    };
});
