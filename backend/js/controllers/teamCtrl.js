backendApp.controller('teamCtrl', function($scope, apiService, teamService){
    $scope.apiService = apiService;
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
});
