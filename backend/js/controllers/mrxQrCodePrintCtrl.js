backendApp.controller('mrxQrCodePrintCtrl', function($scope, apiService, mrxService, configService){
    $scope.apiService = apiService;
    //Initiiert die Basis URL, je nach Standort der Installation
    $scope.baseURL = localStorage.getItem('frontend');
    $scope.apiURL = localStorage.getItem('api');

    //Aktualisiert die Mrx
    $scope.mrxs = [];
    mrxService.subscribe(function(mrxs) {
        $scope.mrxs = mrxs;
    });

    // Config laden
    $scope.config = {};
    configService.subscribe(function(config) {
        $scope.config = config;
    });
});