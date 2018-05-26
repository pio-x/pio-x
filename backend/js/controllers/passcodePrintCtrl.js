backendApp.controller('passcodePrintCtrl', function($scope, apiService, teamService, configService){
    $scope.apiService = apiService;
    //Initiiert die Basis URL, je nach Standort der Installation
    $scope.baseURL = localStorage.getItem('frontend');
    $scope.apiURL = localStorage.getItem('api');

    //Aktualisiert die Teams
    $scope.groups = [];
    teamService.subscribe(function(teams) {
        $scope.groups = teams;
    });

    // Config laden
    $scope.config = {};
    configService.subscribe(function(config) {
        $scope.config = config;
    });
});