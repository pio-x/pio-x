backendApp.controller('configCtrl', function($scope, apiService, configService){
    $scope.configService = configService;
    $scope.config = {};
    $scope.config_original = {};
    configService.subscribe(function(config) {
        $scope.config = config;
        $scope.config_original = JSON.parse(JSON.stringify(config)); // make a copy
    });

    $scope.messages = [];

    $scope.saveConfigAll = function() {
        $scope.messages = [];
        for (var key in $scope.config) {
            if ($scope.config.hasOwnProperty(key)) {
                if ($scope.config[key] != $scope.config_original[key]) {
                    (function() {
                       var data = {value: $scope.config[key], key: key};
                        var updatekey = key;
                        apiService.put('/config', data)
                            .then(function(){
                                configService.update();
                                $scope.messages.push('Konfiguration "' + updatekey + '" gespeichert.');
                            });
                    })();
                }
            }
        }
    };

    $scope.resetData = function () {
        if (!$scope.config_original.game_is_running) {
            if (window.confirm('Wirklich alle Spielstände zurücksetzen?')) {
                apiService.post('/reset', {})
                    .then(function(){
                        $scope.messages.push('Spieldaten zurückgesetzt!');
                    });
            }
        }
    }
});
