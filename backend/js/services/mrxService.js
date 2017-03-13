backendApp.factory('mrxService', function(apiService) {
    var mrxs = [];
    var _subscribers = [];

    // update data and notify subscribers
    var update = function() {
        apiService.get('/mrx').then(function(response) {
            mrxs = response.data;
            angular.forEach(_subscribers, function (cb) {
                cb(mrxs);
            });
        });
    };

    // load initial data
    update();

    return {
        mrxs: mrxs,
        update: update,
        subscribe: function (cb) {
            _subscribers.push(cb);
            cb(mrxs);
        }
    };
});
