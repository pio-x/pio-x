backendApp.controller('mapCtrl', function($scope, NgMap, apiService, riddleService, stationService, teamService, mrxService, $window, configService) {
    NgMap.getMap().then(function(map) {
        $scope.map = map;
    });

    $scope.Math = window.Math;

    //Initiierung der Variablen und Vorselektion der Anzeige
    $scope.defaultMapPosition = '47.498934,8.728970';
    $scope.showStations = true;
    $scope.showRiddles = true;
    $scope.showMrxs = true;
    $scope.showTeams = false;
    $scope.showTeam = false;
    $scope.showTeamLocation = false;
    $scope.playerColors = ["blue", "lime", "darkorange", "gold", "darkviolet", "brown", "darkgreen", "darkred", "olivedrab", "saddlebrown", "tomato", "darkcyan", "pink"];
    $scope.stationColors = ["gold"];
    $scope.resetStationColors = function() {
        for(var i = 1; i < 100;i++) {
            $scope.stationColors[i] = "lime";
        }
    };
    $scope.resetStationColors();
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
        apiService.get('/station/' + id).then(function(response) {
            $scope.changedStation = response.data;
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
        apiService.get('/team/' + id + '/location').then(function(response) {
            $scope.players = response.data.players;
            $scope.captures = response.data.captures;
            //console.log('/team/' + id + '/location');
            //console.log($scope.players);
        });
        //Hebe Stationen von diesem hervor
        $scope.resetStationColors();
        $scope.stationColors[id] = 'red';
    };

    //Aktualisiert die Stationen
    $scope.stations = [];
    stationService.subscribe(function(stations) {
        $scope.stations = stations;
    });

    //Aktualisiert die Mr.X Positionen
    $scope.mrxs = [];
    mrxService.subscribe(function(mrxs) {
        $scope.mrxs = mrxs;
    });

    //Aktualisiert die Rätsel
    $scope.riddles = [];
    riddleService.subscribe(function(riddles) {
        $scope.riddles = riddles;
    });

    //Aktualisiert die Config
    $scope.config = [];
    configService.subscribe(function(config) {
        $scope.config = config;
        if (config.map_center_lat && config.map_center_long) {
            $scope.defaultMapPosition = config.map_center_lat + ',' + config.map_center_long;
        }
    });

    //Ruft alle Aktualisierungsfunktionen in diesem Controller auf
    $scope.refreshData = function() {
        $scope.getTeamLocations(1);
        mrxService.update();
        teamService.update();
        riddleService.update();
        stationService.update();
    };
});
