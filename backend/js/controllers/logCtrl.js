backendApp.controller('logCtrl', function($scope, apiService){
    $scope.apiService = apiService;
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
});
