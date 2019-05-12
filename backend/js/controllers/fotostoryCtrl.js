backendApp.controller('fotostoryCtrl', function($scope, $interval, apiService, teamService, logService, configService, stationService, mrxService){

    $scope.apiURL = localStorage.getItem('api');
    $scope.baseUrl = $scope.apiURL + '/uploaded_images/';

    $scope.storyData = [];

    $scope.backgroundStyle = {
        'width': '100vw',
        'height': '100vh',
        'background-image': '',
        'background-size': 'contain',
        'background-repeat': 'no-repeat',
        'background-position': '50% 50%'
    };

    apiService.get('/fotostory').then(function(response) {
        response.data.forEach(function (foto) {
            if ($scope.storyData[foto.t_ID]) {
                $scope.storyData[foto.t_ID].push(foto);
            } else {
                $scope.storyData[foto.t_ID] = [foto];
            }
        });
        console.log($scope.storyData);
    });

    $scope.hash = localStorage.getItem('hash');


});
