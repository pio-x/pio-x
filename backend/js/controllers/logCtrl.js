backendApp.controller('logCtrl', function($scope, apiService, logService){
    $scope.apiService = apiService;
    $scope.logService = logService;
    $scope.logs = [];
    logService.subscribe(function(logs) {
        $scope.logs = logs;
    });

    $scope.parseDate = function(date) {
        return new Date(date);
    };

    $scope.updateLog = function(id, data) {
        apiService.put('/log/' + id, data)
            .then(function(){
                logService.update();
            });
    };

    $scope.deleteLog = function(id) {
        apiService.delete('/log/' + id)
            .then(function(){
                logService.update();
            });
    };
});
