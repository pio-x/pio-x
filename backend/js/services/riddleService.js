backendApp.factory('riddleService', function(apiService) {
    var riddles = [];
    var _subscribers = [];

    // update data and notify subscribers
    var update = function() {
        apiService.get('/riddle').then(function(response) {
            riddles = response.data;
            angular.forEach(_subscribers, function (cb) {
                cb(riddles);
            });
        });
    };

    // load initial data
    update();

    return {
        riddles: riddles,
        update: update,
        subscribe: function (cb) {
            _subscribers.push(cb);
            cb(riddles);
        }
    };
});
