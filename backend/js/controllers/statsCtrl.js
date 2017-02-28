backendApp.controller('statsCtrl', function($scope, apiService) {

    $scope.statsLoaded = false;
    $scope.isLoading = false;

    $scope.reload = function() {
        $scope.isLoading = true;
        apiService.get('/statistics/points').then(function(result) {
            $scope.pointsChartConfig.series = result.data;
            $scope.isLoading = false;
            $scope.statsLoaded = true;
        });
    };

    $scope.pointsChartConfig = {
        chart: {
            type: 'spline',
            width: 950,
            height: 500
        },
        title: {
            text: 'Punkteverlauf'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                minute: '%H:%M',
                hour: '%H:%M',
                month: '%e. %b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Punkte'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%H:%M}: {point.y} Punkte'
        },
        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },
        series: []
    };

});
