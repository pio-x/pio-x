var TeamPointModalCtrl = function ($scope, $uibModalInstance, $http, apiService, teamService, team_ID, team_name) {
    $scope.points = 0;
    $scope.team_ID = team_ID;
    $scope.team_name = team_name;

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

    $scope.addTeamPoints = function(points) {
        data = {"points": points};
        apiService.post('/points/' + parseInt($scope.team_ID), data)
            .then(function(){
                teamService.update();
            });
    }
};
