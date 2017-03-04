backendApp.factory('riddleService', function(apiService) {
    var riddles = [];
    var _subscribers = [];

    var updateRiddles = function() {
        apiService.get('/riddle').then(function(response) {
            riddles = response.data;
            console.log(riddles);
            angular.forEach(_subscribers, function (cb) {
                cb(riddles);
            });
        });
    };
    updateRiddles();

    return {
        riddles: riddles,
        update: updateRiddles,
        subscribe: function (cb) {
            _subscribers.push(cb);
            cb(riddles);
        }
    };
});
