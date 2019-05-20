backendApp.controller('stationCtrl', function($scope, apiService, stationService, teamService){
    $scope.apiURL = localStorage.getItem('api');
    $scope.hash = localStorage.getItem('hash')

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
});
