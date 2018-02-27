backendApp.controller('mainCtrl', function($scope, apiService){
    $scope.loggedIn = false;
    $scope.showLogin = false;
    $scope.hash = 'admin'; //TODO empty string on production
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
    $scope.login = function(hash) {
        localStorage.setItem('hash', hash);
        $scope.checkLogin();
    };
    $scope.logout = function() {
        localStorage.setItem('hash', '');
        $scope.checkLogin();
    };
});
