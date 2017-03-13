backendApp.controller('configCtrl', function($scope, apiService, configService){
    $scope.configService = configService;
    $scope.config = [];
    configService.subscribe(function(config) {
        $scope.config = config;
    });

    $scope.saveConfig = function(key, value) {
      var data = {value: value, key: key};
        apiService.put('/config', data)
            .then(function(){
                configService.update();
                alert('Config erfolgreich gespeichert!');
            });
    };
});
