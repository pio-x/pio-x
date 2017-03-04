backendApp.factory('stationService', function(apiService) {
    var stations = [];
    var _subscribers = [];

    // update data and notify subscribers
    var update = function() {
        apiService.get('/station').then(function(response) {
            stations = response.data;
            angular.forEach(_subscribers, function (cb) {
                cb(stations);
            });
        });
    };

    // load initial data
    update();

    return {
        stations: stations,
        update: update,
        subscribe: function (cb) {
            _subscribers.push(cb);
            cb(stations);
        }
    };
});
