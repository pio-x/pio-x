var backendApp = angular.module('backendApp', ['monospaced.qrcode', 'ngMap'])
    //MAP
    .controller('mapCtrl', function($scope, NgMap, apiService, $window) {
        NgMap.getMap().then(function(map) {
            $scope.map = map;
        });

        $scope.showStations = true;
        $scope.showRiddles = true;
        $scope.showMrxs = true;
        $scope.showTeams = true;
        $scope.showTeam = true;
        $scope.showTeamLocation = false;
        $scope.showNewObjectInput = 'station';
        $scope.newStation = {};
        $scope.newObjectPosition = [];

        $scope.createNewStation = function() {
            var data = {
                name: $scope.newStation.name,
                description: $scope.newStation.description,
                pos_lat: $scope.newlat,
                pos_long: $scope.newlng
            };
            //console.log(data);
            apiService.post('/station', data)
                .then(function(){
                    $scope.refreshData();
                    $scope.newlat = '';
                    $scope.newlng = '';
                    $scope.newStation = {};
                    $scope.newObjectPosition = [];
                    //console.log($scope.newObjectPosition)
                }
            );
        };

        $scope.showCreateNew = function(evt) {
            $scope.newObjectPosition = [evt.latLng.lat(), evt.latLng.lng()];
            $scope.newlat = evt.latLng.lat();
            $scope.newlng = evt.latLng.lng();
        };

        $scope.showTooltip = function(evt, id, obj) {
            $scope.shown = obj[id];
            $scope.map.showInfoWindow('infoWindow', this);
        };

        $scope.getTeams = function() {
            apiService.get('/team').then(function(articlesResponse) {
                $scope.groups = articlesResponse.data;
            });
        };
        $scope.getTeams();

        $scope.getTeamLocations = function(id) {
            apiService.get('/team/' + id + '/location').then(function(articlesResponse) {
                $scope.players = articlesResponse.data;
                //console.log('/team/' + id + '/location');
                //console.log($scope.players);
            });
        };
        $scope.selectedTeam = 1;
        $scope.getTeamLocations($scope.selectedTeam);

        $scope.getStations = function() {
            apiService.get('/station').then(function(articlesResponse) {
                $scope.stations = articlesResponse.data;
            });
        };
        $scope.getStations();

        $scope.getMrxs = function() {
            apiService.get('/mrx').then(function(articlesResponse) {
                $scope.mrxs = articlesResponse.data;
            });
        };
        $scope.getMrxs();

        $scope.getRiddles = function() {
            apiService.get('/riddle').then(function(articlesResponse) {
                $scope.riddles = articlesResponse.data;
            });
        };
        $scope.getRiddles();

        $scope.refreshData = function() {
            $scope.getTeams();
            $scope.getTeamLocations(1);
            $scope.getStations();
            $scope.getMrxs();
            $scope.getRiddles();
        };
    })
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
        $scope.updateTeam = function(data, id) {
            apiService.put('/team/' + id, data)
                .then(function(){
                    $scope.getTeams();
                });
        };
        $scope.deleteTeam = function(id) {
            //TODO delete noch nicht in API vorhanden, wird es vorerst auch nicht geben
            //apiService.delete('/team', id);
        };
        $scope.newTeam = {};
        $scope.emptyNewTeam = function() {
            $scope.newTeam = {
                name: "",
                hash: "",
                color: "",
                score: ""
            };
        };
        $scope.emptyNewTeam();
        $scope.addNewTeam = function(data) {
            apiService.post('/team', data)
                .then(function(){
                    $scope.getTeams();
                    $scope.emptyNewTeam();
                });
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
    // LOG / IMAGES / STREAM
    .controller('logCtrl', function($scope, apiService){
        $scope.apiUrl = 'https://api.pio-x.ch/image/';
        if(window.location.host == "localhost") {
            $scope.apiUrl = 'http://localhost' + window.location.pathname + '../api/image/';
        }
        $scope.imgHash = "?hash=" + localStorage.getItem("hash");
        $scope.getLogs = function() {
            apiService.get('/log').then(function(articlesResponse) {
                $scope.logs = articlesResponse.data;
            });
        };
        $scope.parseDate = function(date) {
            return new Date(date);
        };
        $scope.getLogs();
        $scope.updateLog = function(id, data) {
            apiService.put('/log/' + id, data)
                .then(function(){
                    $scope.getLogs();
                });
        };
        $scope.deleteLog = function(id) {
            apiService.delete('/log/' + id)
                .then(function(){
                    $scope.getLogs();
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
            apiService.delete('/notification/' + id)
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
        $scope.addNewRiddle = function(data) {
            apiService.post('/riddle', data)
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
    })
    //TEAMS
    .controller('teamPickerCtrl', function($scope, apiService){
        $scope.getTeams = function() {
            apiService.get('/team').then(function(articlesResponse) {
                $scope.groups = articlesResponse.data;
            });
        };
        $scope.getTeams();
    })
    //Config
    .controller('configCtrl', function($scope, apiService){
        $scope.getConfig = function() {
            apiService.get('/config').then(function(articlesResponse) {
                $scope.config = articlesResponse.data;
            });
        };
        $scope.getConfig();
        $scope.saveConfig = function(key, value) {
          var data = {value: value, key: key};
            apiService.put('/config', data)
                .then(function(){
                    $scope.getConfig();
                    alert('Config erfolgreich gespeichert!');
                });
        };
    });
