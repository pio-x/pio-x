var backendApp = angular.module('backendApp', ['monospaced.qrcode', 'ngMap', 'highcharts-ng'])
    //MAP
    .controller('mapCtrl', function($scope, NgMap, apiService, riddleService, stationService, teamService, $window) {
        NgMap.getMap().then(function(map) {
            $scope.map = map;
        });

        //Initiierung der Variablen und Vorselektion der Anzeige
        $scope.showStations = true;
        $scope.showRiddles = true;
        $scope.showMrxs = true;
        $scope.showTeams = false;
        $scope.showTeam = false;
        $scope.showTeamLocation = false;
        $scope.playerColors = ["blue", "lime", "darkorange", "gold", "darkviolet", "brown", "darkgreen", "darkred", "olivedrab", "saddlebrown", "tomato", "darkcyan", "pink"]
        $scope.showNewObjectInput = 'station';
        $scope.newStation = {
            points: 10,
            enabled: 1
        };
        $scope.newRiddle = {
            type: "MULTI",
            answer_required: 1,
            image_required: 0,
            points: 50
        };
        $scope.newObjectPosition = [];
        $scope.showEditStation = false;
        $scope.hideEditStation = function() {
            $scope.showEditStation = false;
        }

        //Zum Station bearbeiten
        $scope.changedStation = {};
        $scope.editStation = function(id) {
            $scope.showEditStation = true;
            apiService.get('/station/' + id).then(function(articlesResponse) {
                $scope.changedStation = articlesResponse.data;
            });
        };
        $scope.saveStation = function() {
            apiService.put('/station/' + $scope.changedStation.s_ID, $scope.changedStation)
                .then(function(){
                    stationService.update();
                });
            $scope.map.hideInfoWindow('infoWindow');
            $scope.showEditStation = false;
        };

        //Erfasst eine neue Station
        $scope.createNewStation = function() {
            var data = {
                name: $scope.newStation.name,
                description: $scope.newStation.description,
                pos_lat: $scope.newlat,
                pos_long: $scope.newlng,
                points: $scope.newStation.points,
                enabled: $scope.newStation.enabled
            };
            //console.log(data);
            apiService.post('/station', data)
                .then(function(){
                    $scope.refreshData();
                    $scope.newlat = '';
                    $scope.newlng = '';
                    $scope.newStation = {
                        points: 10,
                        enabled: 1
                    };
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
                    $scope.newRiddle.title = '';
                    $scope.newRiddle.question = '';
                    $scope.newRiddle.dep_ID = 0;
                    $scope.newRiddle.answer = '';
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
        $scope.showTooltip = function(evt, id, obj, key) {
            $scope.shown = obj[id];
            $scope.key = key;
            $scope.map.showInfoWindow('infoWindow', this);
            //console.log(key);
        };

        //Aktualisiert die Teams
        $scope.groups = [];
        teamService.subscribe(function(teams) {
            $scope.groups = teams;
        });

        //Selektionsvariable, welches Team zu Beginn angezeigt wird.
        $scope.selectedTeam = 1;

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
        $scope.stations = [];
        stationService.subscribe(function(stations) {
            $scope.stations = stations;
        });

        //Aktualisiert die Mr.X Positionen
        $scope.getMrxs = function() {
            apiService.get('/mrx').then(function(articlesResponse) {
                $scope.mrxs = articlesResponse.data;
            });
        };
        $scope.getMrxs();

        //Aktualisiert die Rätsel
        $scope.riddles = [];
        riddleService.subscribe(function(riddles) {
            $scope.riddles = riddles;
        });

        //Ruft alle Aktualisierungsfunktionen in diesem Controller auf
        $scope.refreshData = function() {
            $scope.getTeamLocations(1);
            $scope.getMrxs();
            teamService.update();
            riddleService.update();
            stationService.update();
        };
    })
    //QR CODES CONTROLLER ==============================================================================
    .controller('QRCtrl', function($scope, apiService, teamService){
        //Initiiert die Basis URL, je nach Standort der Installation
        $scope.baseURL = 'https://api.pio-x.ch';
        if(window.location.host == "localhost") {
            $scope.baseURL = 'http://localhost' + window.location.pathname + '../api';
            if(window.location.pathname.substr("passcodes.html")) {
                $scope.baseURL = 'http://localhost' + window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/')) + '/../app/www';
            }
        }

        $scope.groups = [];
        teamService.subscribe(function(teams) {
            $scope.groups = teams;
        });

        //Aktualisiert die Mr.X
        $scope.getMrxs = function() {
            apiService.get('/mrx').then(function(articlesResponse) {
                $scope.mrxs = articlesResponse.data;
            });
        };
        $scope.getMrxs();

        //Initiiert die QRCODE URL Variable
        $scope.qrUrl = {
            team: "",
            link: ""
        };

        //zeigt den QR CODE für den Login vom gewählten Team/MrX an
        $scope.showQR = function(id, name, hash, type) {
            $scope.qrUrl.team = name;
            $scope.qrUrl.link = 'https://app.pio-x.ch/login.html?' + type +'=' + id + '&hash=' + hash;
        };

        //Aktualisiert die ganze Liste
        $scope.refresh = function() {
            teamService.update();
            $scope.getMrxs();
        };
    })
    //TEAMS CONTROLLER ==============================================================================
    .controller('teamCtrl', function($scope, apiService, teamService){
        $scope.groups = [];
        teamService.subscribe(function(teams) {
            $scope.groups = teams;
        });

        $scope.updateTeam = function(data, id) {
            apiService.put('/team/' + id, data)
                .then(function(){
                    teamService.update();
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
                    teamService.update();
                    $scope.emptyNewTeam();
                });
        };
    })
    //STATIONS CONTROLLER ==============================================================================
    .controller('stationCtrl', function($scope, apiService, stationService, teamService){
        $scope.stations = [];
        $scope.stationService = stationService;
        $scope.stationService.subscribe(function(stations) {
            $scope.stations = stations;
        });

        $scope.teams = {};
        teamService.subscribe(function(teams) {
            angular.forEach(teams, function(value, key) {
                $scope.teams[value['t_ID']] = value;
            });
        });

        $scope.newStation = {};
        $scope.emptyNewStation = function() {
            $scope.newStation = {
                name: "",
                description: "",
                pos_lat: "",
                pos_long: "",
                points: 10,
                team: ""
            }
        };
        $scope.emptyNewStation();
        $scope.updateStation = function(id, data) {
            apiService.put('/station/' + id, data)
                .then(function(){
                    $scope.stationService.update();
                });
        };
        $scope.addNewStation = function(data) {
            apiService.post('/station', data)
                .then(function(){
                    $scope.stationService.update();
                    $scope.emptyNewStation();
                });
        };
        $scope.deleteStation = function(id) {
            apiService.delete('/station/' + id)
                .then(function(){
                    $scope.stationService.update();
                });
        };
    })
    // LOG / IMAGES / STREAM CONTROLLER ==============================================================================
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
    //PASSCODES CONTROLLER ==============================================================================
    .controller('passcodeCtrl', function($scope, apiService){
        $scope.getCodes = function() {
            apiService.get('/passcode').then(function(articlesResponse) {
                $scope.passcodes = articlesResponse.data;
            });
        };
        $scope.getCodes();
        $scope.newCode = {
            code: "",
            points: 500,
            mrx_ID: 1
        };
        $scope.emptyNewCode = function() {
            $scope.newCode.code = "";
        };
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
    //NOTIFICATIONS CONTROLLER ==============================================================================
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
    //RIDDLES CONTROLLER ==============================================================================
    .controller('riddleCtrl', function($scope, apiService, riddleService){
        $scope.riddles = [];
        $scope.riddleService = riddleService;
        $scope.riddleService.subscribe(function(riddles) {
            $scope.riddles = riddles;
        });

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
                points: 50,
                answer_required: 1,
                image_required: 0
            };
        };
        $scope.emptyNewRiddle();
        $scope.addNewRiddle = function(data) {
            apiService.post('/riddle', data)
                .then(function(){
                    $scope.riddleService.update();
                    $scope.emptyNewRiddle();
                });
        };
        $scope.deleteRiddle = function(id) {
            apiService.delete('/riddle/' + id)
                .then(function(){
                    $scope.riddleService.update();
                });
        };
        $scope.updateRiddle = function(id, data) {
            apiService.put('/riddle/' + id, data)
                .then(function(){
                    $scope.riddleService.update();
                });
        };
    })
    //MAIN CONTROLLER ==============================================================================
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
    //CONFIG CONTROLLER ==============================================================================
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
    })
    .filter('moment', function() {
        return function(dateString, format) {
            return moment(dateString).format(format);
        };
    });
