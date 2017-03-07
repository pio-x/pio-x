backendApp.controller('QRCtrl', function($scope, apiService, teamService){
    $scope.apiService = apiService;
    //Initiiert die Basis URL, je nach Standort der Installation
    $scope.baseURL = 'https://api.pio-x.ch';
    if(window.location.host == "localhost") {
        $scope.baseURL = 'http://localhost' + window.location.pathname + '../api';
        if(window.location.pathname.substr("passcodes.html")) {
            $scope.baseURL = 'http://localhost' + window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/')) + '/../app/www';
        }
    }

    $scope.groups = [];
    teamService.subscribe(function(teams) {
        $scope.groups = teams;
    });

    //Aktualisiert die Mr.X
    $scope.getMrxs = function() {
        apiService.get('/mrx').then(function(articlesResponse) {
            $scope.mrxs = articlesResponse.data;
        });
    };
    $scope.getMrxs();

    //Initiiert die QRCODE URL Variable
    $scope.qrUrl = {
        team: "",
        link: ""
    };

    //zeigt den QR CODE für den Login vom gewählten Team/MrX an
    $scope.showQR = function(id, name, hash, type) {
        $scope.qrUrl.team = name;
        $scope.qrUrl.link = 'https://app.pio-x.ch/login.html?' + type +'=' + id + '&hash=' + hash;
    };

    //Aktualisiert die ganze Liste
    $scope.refresh = function() {
        teamService.update();
        $scope.getMrxs();
    };
});