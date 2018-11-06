backendApp.controller('teamCtrl', function($scope, $uibModal, apiService, teamService){
    $scope.apiService = apiService;
    $scope.teamService = teamService;
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
    $scope.pointModal = function(team_ID, team_name) {
      var modalInstance = $uibModal.open({
      templateUrl: 'js/templates/modals/teamPointModal.html',
      controller: TeamPointModalCtrl,
      size: 'lg',
      resolve: {
        team_ID: function () {
          return team_ID;
        },
        team_name: function() {
            return team_name;
        }
      }
    });
    }
});
