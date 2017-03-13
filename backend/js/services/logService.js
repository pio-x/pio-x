backendApp.factory('logService', function(apiService) {
    var logs = [];
    var _subscribers = [];

    // update data and notify subscribers
    var update = function() {
        apiService.get('/log').then(function(response) {
            logs = response.data;
            angular.forEach(_subscribers, function (cb) {
                cb(logs);
            });
        });
    };

    // load initial data
    update();

    return {
        logs: logs,
        update: update,
        subscribe: function (cb) {
            _subscribers.push(cb);
            cb(logs);
        }
    };
});
