backendApp.factory('teamService', function(apiService) {
    var teams = [];
    var _subscribers = [];

    // update data and notify subscribers
    var update = function() {
        apiService.get('/team').then(function(response) {
            teams = response.data;
            angular.forEach(_subscribers, function (cb) {
                cb(teams);
            });
        });
    };

    // load initial data
    update();

    return {
        teams: teams,
        update: update,
        subscribe: function (cb) {
            _subscribers.push(cb);
            cb(teams);
        }
    };
});
