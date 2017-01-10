var backendApp = angular.module('backendApp', ['monospaced.qrcode'])
    .controller('QRCtrl', function($scope, apiService){
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
        $scope.showGroupQR = function(id, name, hash) {
            $scope.qrUrl.team = name;
            $scope.qrUrl.link = 'https://app.pio-x.ch/login.html?team=' + id + '&hash=' + hash;
        };
        $scope.showMrxQR = function(id, name, hash) {
            $scope.qrUrl.team = name;
            $scope.qrUrl.link = 'https://app.pio-x.ch/login.html?mrx=' + id + '&hash=' + hash;
        };
    })
    .controller('teamCtrl', function($scope, apiService){
        apiService.get('/team').then(function(articlesResponse) {
            $scope.groups = articlesResponse.data;
        });
    })
    .controller('stationCtrl', function($scope, apiService){
        apiService.get('/station').then(function(articlesResponse) {
            $scope.stations = articlesResponse.data;
        });
    })
    .controller('passcodeCtrl', function($scope, apiService){
        apiService.get('/passcode').then(function(articlesResponse) {
            $scope.passcodes = articlesResponse.data;
        });
        $scope.newCode = {
            code: "",
            points: "",
            used: "",
            mrx_ID: ""
        };
        $scope.addNew = function() {
            apiService.post('/passcode', $scope.newCode);
        };
    })
    .controller('notificationCtrl', function($scope, apiService){
        apiService.get('/notification').then(function(articlesResponse) {
            $scope.notifications = articlesResponse.data;
        });
    })
    .controller('riddleCtrl', function($scope, apiService){
        $scope.getRiddles = function() {
            apiService.get('/riddle').then(function(articlesResponse) {
                $scope.riddles = articlesResponse.data;
            });
        };
        $scope.getRiddles();
        $scope.newRiddle = {
            pos_lat: "",
            pos_long: "",
            question: "",
            dep_ID: "",
            answer: "",
            type: "MULTI",
            points: 1
        };
        $scope.addNew = function() {
            apiService.post('/riddle', $scope.newRiddle)
                .then($scope.getRiddles());
        };
        $scope.deleteRiddle = function(id) {

        };
    })
    .controller('mainCtrl', function($scope, apiService){
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
            localStorage.setItem('hash', hash);
            $scope.checkLogin();
        };
        $scope.logout = function() {
            localStorage.setItem('hash', '');
            $scope.checkLogin();
        };
    });