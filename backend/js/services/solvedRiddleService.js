backendApp.factory('solvedRiddleService', function(apiService) {
    var solvedRiddles = [];
    var _subscribers = [];

    // update data and notify subscribers
    var update = function() {
        apiService.get('/riddle/solved').then(function(response) {
            solvedRiddles = response.data;
            angular.forEach(_subscribers, function (cb) {
                cb(solvedRiddles);
            });
        });
    };

    // load initial data
    update();

    return {
        solvedRiddles: solvedRiddles,
        update: update,
        subscribe: function (cb) {
            _subscribers.push(cb);
            cb(solvedRiddles);
        }
    };
});
