backendApp.controller('dashboardCtrl', function($scope, $interval, apiService, teamService, logService, configService, stationService, mrxService){

    /* TODO:
     - Teams: anz. stationen, geschwindigkeit
     */

    $scope.apiService = apiService;
    $scope.defaultMapPosition = '47.498934,8.728970';

    //Aktualisiert die Teams
    $scope.teams = [];
    $scope.teamService = teamService;
    teamService.subscribe(function(teams) {
        $scope.teams = teams;
    });

    //Aktualisiert die Logs
    $scope.logs = [];
    logService.subscribe(function(logs) {
        $scope.logs = logs;
    });

    //Aktualisiert die Config
    $scope.config = [];
    configService.subscribe(function(config) {
        $scope.config = config;
        if (config.map_center_lat && config.map_center_long) {
            $scope.defaultMapPosition = config.map_center_lat + ',' + config.map_center_long;
        }
    });

    //Aktualisiert die MrX's
    $scope.mrxs = [];
    mrxService.subscribe(function(mrxs) {
        $scope.mrxs = mrxs;
    });

    //Aktualisiert die Stations
    $scope.stations = [];
    $scope.stations_captured = 0;
    stationService.subscribe(function(stations) {
        $scope.stations = stations;
        $scope.stations_captured = 0;
        angular.forEach(stations, function(station, key) {
           if (station.team) {
               $scope.stations_captured += 1;
           }
        });
    });

    $scope.refresh = function () {
        teamService.update();
        logService.update();
        configService.update();
        stationService.update();
        mrxService.update();
    };

    // auto-refresh every 10 sec.
    $interval($scope.refresh, 10000);
});
