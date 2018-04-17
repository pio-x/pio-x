backendApp.controller('QRCtrl', function($scope, apiService, teamService, mrxService){
    $scope.apiService = apiService;
    //Initiiert die Basis URL, je nach Standort der Installation
    $scope.baseURL = localStorage.getItem('frontend');
    $scope.apiURL = localStorage.getItem('api');

    //Aktualisiert die Teams
    $scope.groups = [];
    teamService.subscribe(function(teams) {
        $scope.groups = teams;
    });

    //Aktualisiert die Mr.X
    $scope.mrxs = [];
    mrxService.subscribe(function(mrxs) {
        $scope.mrxs = mrxs;
    });

    //Initiiert die QRCODE URL Variable
    $scope.qrUrl = {
        team: "",
        link: ""
    };

    //zeigt den QR CODE für den Login vom gewählten Team/MrX an
    $scope.showQR = function(id, name, hash, type) {
        $scope.qrUrl.team = name;
        $scope.qrUrl.link = $scope.baseURL + '/login.html?' + type +'=' + id + '&hash=' + hash + '&api=' + $scope.apiURL;
    };

    //Aktualisiert die ganze Liste
    $scope.refresh = function() {
        teamService.update();
        mrxService.update();
    };
});