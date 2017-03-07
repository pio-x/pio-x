backendApp.controller('configCtrl', function($scope, apiService){
    $scope.getConfig = function() {
        apiService.get('/config').then(function(articlesResponse) {
            $scope.config = articlesResponse.data;
        });
    };
    $scope.getConfig();
    $scope.saveConfig = function(key, value) {
      var data = {value: value, key: key};
        apiService.put('/config', data)
            .then(function(){
                $scope.getConfig();
                alert('Config erfolgreich gespeichert!');
            });
    };
});
