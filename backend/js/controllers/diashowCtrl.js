backendApp.controller('diashowCtrl', function($scope, $interval, apiService, teamService, logService, configService, stationService, mrxService){

    $scope.apiURL = localStorage.getItem('api');

    $scope.diashowIndex = 0;
    $scope.diashowData = [];
    $scope.caption = '';

    $scope.backgroundStyle = {
        'width': '100vw',
        'height': '100vh',
        'background-image': '',
        'background-size': 'contain',
        'background-repeat': 'no-repeat',
        'background-position': '50% 50%'
    };

    apiService.get('/diashow').then(function(response) {
        $scope.diashowData = response.data;
    });

    $scope.refresh = function() {
        if ($scope.diashowData[$scope.diashowIndex + 1]) {
            var baseUrl = $scope.apiURL + '/uploaded_images/';
            $scope.diashowIndex++;
            $scope.backgroundStyle['background-image'] = 'url("' + baseUrl + $scope.diashowData[$scope.diashowIndex].img_ID + '.jpg?hash=' + $scope.hash + '")';
            $scope.caption = $scope.diashowData[$scope.diashowIndex].text;

            // cache next image
            if ($scope.diashowData[$scope.diashowIndex + 1]) {
                preloadImage(baseUrl + $scope.diashowData[$scope.diashowIndex + 1].img_ID + '.jpg?hash=' + $scope.hash);
            }
        }
    };

    $scope.hash = localStorage.getItem('hash');

    // auto-refresh every 1 sec.
    $interval($scope.refresh, 2000);

    function preloadImage(url)
    {
        var img = new Image();
        img.src = url;
    }

});
