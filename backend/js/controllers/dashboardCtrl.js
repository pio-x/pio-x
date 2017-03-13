backendApp.controller('dashboardCtrl', function($scope, $interval, apiService, teamService, logService){
    $scope.apiService = apiService;

    //Aktualisiert die Teams
    $scope.teams = [];
    teamService.subscribe(function(teams) {
        $scope.teams = teams;
    });

    //Aktualisiert die Logs
    $scope.logs = [];
    logService.subscribe(function(logs) {
        $scope.logs = logs;
    });

    $scope.refresh = function () {
        teamService.update();
        logService.update();
    };

    // auto-refresh every 10 sec.
    $interval($scope.refresh, 10000);
});
