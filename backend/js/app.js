var backendApp = angular.module('backendApp', ['monospaced.qrcode'])
    //QR CODES
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
        $scope.showQR = function(id, name, hash, type) {
            $scope.qrUrl.team = name;
            $scope.qrUrl.link = 'https://app.pio-x.ch/login.html?' + type +'=' + id + '&hash=' + hash;
        };
    })
    //TEAMS
    .controller('teamCtrl', function($scope, apiService){
        $scope.getTeams = function() {
            apiService.get('/team').then(function(articlesResponse) {
                $scope.groups = articlesResponse.data;
            });
        };
        $scope.getTeams();
        $scope.updateTeam = function(data) {
            apiService.put('/team', data)
                .then(function(){
                    $scope.getTeams();
                });
        };
        $scope.deleteTeam = function(id) {
            //TODO delete noch nicht in API vorhanden, wird es vorerst auch nicht geben
            //apiService.delete('/team', id);
        };
        $scope.newTeam = {
            name: "",
            hash: "",
            color: "",
            score: ""
        };
        $scope.addNewTeam = function(data) {
            apiService.post('/team', data)
                .then(function(){
                    $scope.getTeams();
                });
        };
    })
    //mapCtrl
    .controller('mapCtrl', function($scope, apiService){
        apiService.get('/team').then(function(articlesResponse) {
            $scope.groups = articlesResponse.data;
        });
        $scope.showTeamOnMap = function(id) {
            //TODO zeige Team auf Karte an
        };
    })
    //STATIONS
    .controller('stationCtrl', function($scope, apiService){
        $scope.getStations = function() {
            apiService.get('/station').then(function(articlesResponse) {
                $scope.stations = articlesResponse.data;
            });
        };
        $scope.getStations();
        $scope.newStation = {};
        $scope.emptyNewStation = function() {
            $scope.newStation = {
                name: "",
                description: "",
                pos_lat: "",
                pos_long: "",
                captured_timestamp: "",
                team: ""
            }
        };
        $scope.emptyNewStation();
        $scope.updateStation = function(id, data) {
            apiService.put('/station/' + id, data)
                .then(function(){
                    $scope.getStations();
                });
        };
        $scope.addNewStation = function(data) {
            apiService.post('/station', data)
                .then(function(){
                    $scope.getStations();
                    $scope.emptyNewStation();
                });
        };
        $scope.deleteStation = function(id) {
            apiService.delete('/station/' + id)
                .then(function(){
                    $scope.getStations();
                });
        };
    })
    //PASSCODES
    .controller('passcodeCtrl', function($scope, apiService){
        $scope.getCodes = function() {
            apiService.get('/passcode').then(function(articlesResponse) {
                $scope.passcodes = articlesResponse.data;
            });
        };
        $scope.getCodes();
        $scope.newCode = {};
        $scope.emptyNewCode = function() {
            $scope.newCode = {
                code: "",
                points: "",
                used: "",
                mrx_ID: ""
            };
        };
        $scope.emptyNewCode();
        $scope.addNewCode = function(data) {
            apiService.post('/passcode', data)
                .then(function(){
                    $scope.getCodes();
                    $scope.emptyNewCode();
                });
        };
        $scope.deleteCode = function(id) {
            apiService.delete('/passcode' + id)
                .then(function(){
                    $scope.getCodes();
                });
        };
        $scope.updateCode = function(id, data) {
            apiService.put('/passcode/'+ id, data)
                .then(function(){
                    $scope.getCodes();
                });
        };
    })
    //NOTIFICATIONS
    .controller('notificationCtrl', function($scope, apiService){
        $scope.getNotifications = function() {
            apiService.get('/notification').then(function(articlesResponse) {
                $scope.notifications = articlesResponse.data;
            });
        };
        $scope.getNotifications();
        $scope.newNotification = {};
        $scope.emptyNewNotification = function() {
            $scope.newNotification = {
                title: "",
                text: "",
                timestamp: "",
                t_ID: ""
            };
        };
        $scope.emptyNewNotification();
        $scope.updateNotification = function(data) {
            apiService.put('/notification', data)
                .then(function(){
                    $scope.getNotifications();
                });
        };
        $scope.addNewNotification = function(data) {
            apiService.post('/notification', data)
                .then(function(){
                    $scope.getNotifications();
                    $scope.emptyNewNotification();
                });
        };
        $scope.deleteNotification = function(id) {
            apiService.delete('/notification' + id)
                .then(function(){
                    $scope.getNotifications();
                });
        };
    })
    //RIDDLES
    .controller('riddleCtrl', function($scope, apiService){
        $scope.getRiddles = function() {
            apiService.get('/riddle').then(function(articlesResponse) {
                $scope.riddles = articlesResponse.data;
            });
        };
        $scope.getRiddles();
        $scope.newRiddle = {};
        $scope.emptyNewRiddle = function() {
            $scope.newRiddle = {
                pos_lat: "",
                pos_long: "",
                question: "",
                dep_ID: "",
                answer: "",
                type: "MULTI",
                points: 1
            };
        };
        $scope.emptyNewRiddle();
        $scope.addNewRiddle = function() {
            apiService.post('/riddle', $scope.newRiddle)
                .then(function(){
                    $scope.getRiddles();
                    $scope.emptyNewRiddle();
                });
        };
        $scope.deleteRiddle = function(id) {
            apiService.delete('/riddle/' + id)
                .then(function(){
                    $scope.getRiddles();
                });
        };
        $scope.updateRiddle = function(id, data) {
            apiService.put('/riddle/' + id, data)
                .then(function(){
                    $scope.getRiddles();
                });
        };
    })
    //MAIN
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