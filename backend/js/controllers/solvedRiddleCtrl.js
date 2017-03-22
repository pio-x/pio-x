backendApp.controller('solvedRiddleCtrl', function ($scope, apiService, solvedRiddleService, teamService) {
    $scope.solvedRiddles = [];
    $scope.solvedRiddleService = solvedRiddleService;
    $scope.apiService = apiService;
    $scope.teamService = teamService;
    $scope.solvedRiddleService.subscribe(function (solvedRiddles) {
        $scope.solvedRiddles = solvedRiddles;
    });

    //Alerts
    $scope.alerts = [];

    $scope.addAlert = function (alert) {
        $scope.alerts.push(alert);
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.punishTeam = function (team, points) {
        data = { "points": points };
        apiService.post('/points/' + String(team), data)
            .then(function () {
                $scope.addAlert({ type: 'success', msg: 'Du hast Team ' + String(team) + ' wurde für ein schlechtes Bild bestraft: ' + String(points) + ' Punkte' });
                $scope.teamService.update();
            });
    };
});
