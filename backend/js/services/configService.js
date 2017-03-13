backendApp.factory('configService', function(apiService) {
    var config = [];
    var _subscribers = [];

    // update data and notify subscribers
    var update = function() {
        apiService.get('/config').then(function(response) {
            config = response.data;
            angular.forEach(_subscribers, function (cb) {
                cb(config);
            });
        });
    };

    // load initial data
    update();

    return {
        config: config,
        update: update,
        subscribe: function (cb) {
            _subscribers.push(cb);
            cb(config);
        }
    };
});
