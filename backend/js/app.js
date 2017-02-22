var backendApp = angular.module('backendApp', ['monospaced.qrcode', 'ngMap'])
    //MAP
    .controller('mapCtrl', function($scope, NgMap, apiService, $window) {
        NgMap.getMap().then(function(map) {
            $scope.map = map;
        });

        //Initiierung der Variablen und Vorselektion der Anzeige
        $scope.showStations = false;
        $scope.showRiddles = false;
        $scope.showMrxs = false;
        $scope.showTeams = true;
        $scope.showTeam = true;
        $scope.showTeamLocation = true;
        $scope.playerColors = ["#f00", "#0f0", "#00f"]
        $scope.showNewObjectInput = 'station';
        $scope.newStation = {};
        $scope.newRiddle = {
            type: "MULTI",
            answer_required: 1,
            image_required: 0,
            points: 1
        };
        $scope.newObjectPosition = [];

        //Erfasst eine neue Station
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

        //Erfasst eine neues Rätsel
        $scope.createNewRiddle = function() {
            //console.log($scope.newRiddle.title);
            var data = {
                title: $scope.newRiddle.title,
                question: $scope.newRiddle.question,
                pos_lat: $scope.newlat,
                pos_long: $scope.newlng,
                dep_ID: $scope.newRiddle.dep_ID,
                answer: $scope.newRiddle.answer,
                type: $scope.newRiddle.type,
                points: $scope.newRiddle.points,
                answer_required: $scope.newRiddle.answer_required,
                image_required: $scope.newRiddle.image_required
            };
            //console.log(data);
            apiService.post('/riddle', data)
                .then(function(){
                    $scope.refreshData();
                    $scope.newlat = '';
                    $scope.newlng = '';
                    $scope.newRiddle = {};
                    $scope.newObjectPosition = [];
                    //console.log($scope.newObjectPosition)
                }
            );
        };

        //Zeigt den Editor für neue Stationen und Rätsel an
        $scope.showCreateNew = function(evt) {
            $scope.newObjectPosition = [evt.latLng.lat(), evt.latLng.lng()];
            $scope.newlat = evt.latLng.lat();
            $scope.newlng = evt.latLng.lng();
        };

        //Zeigt auf einem Marker ein Tooltip mit Infos an
        $scope.showTooltip = function(evt, id, obj) {
            $scope.shown = obj[id];
            $scope.map.showInfoWindow('infoWindow', this);
            console.log(obj);
        };

        //Aktualisiert die Teams
        $scope.getTeams = function() {
            apiService.get('/team').then(function(articlesResponse) {
                $scope.groups = articlesResponse.data;
            });
        };
        $scope.getTeams();

        //Selektionsvariable, welches Team angezeigt wird.
        $scope.selectedTeam = 2;

        //Ruft die Positionen aller Spieler aus einem Team ab
        $scope.getTeamLocations = function(id) {
            apiService.get('/team/' + id + '/location').then(function(articlesResponse) {
                $scope.players = articlesResponse.data;
                //console.log('/team/' + id + '/location');
                //console.log($scope.players);
            });
        };
        $scope.getTeamLocations($scope.selectedTeam);

        //Aktualisiert die Stationen
        $scope.getStations = function() {
            apiService.get('/station').then(function(articlesResponse) {
                $scope.stations = articlesResponse.data;
            });
        };
        $scope.getStations();

        //Aktualisiert die Mr.X Positionen
        $scope.getMrxs = function() {
            apiService.get('/mrx').then(function(articlesResponse) {
                $scope.mrxs = articlesResponse.data;
            });
        };
        $scope.getMrxs();

        //Aktualisiert die Rätsel
        $scope.getRiddles = function() {
            apiService.get('/riddle').then(function(articlesResponse) {
                $scope.riddles = articlesResponse.data;
            });
        };
        $scope.getRiddles();

        //Ruft alle Aktualisierungsfunktionen in diesem Controller auf
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
                title: "",
                question: "",
                dep_ID: "",
                answer: "",
                type: "MULTI",
                points: 1,
                answer_required: 1,
                image_required: 0
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
