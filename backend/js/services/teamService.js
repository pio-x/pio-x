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

    var distinctColor = function(id) {
        // 32 distinct colors
        var colors = ['#f23e22', '#d1c51d', '#77baad', '#1d1dd1', '#eb2172', '#f0a599', '#b0ac71', '#24fff0', '#9999f0', '#e391a7', '#c96f4f', '#bbeb5b', '#1b9ebf', '#7654d6', '#f2223e', '#ed7321', '#94c981', '#9ee6f7', '#9122f2', '#c74e5e', '#ebb896', '#1ed41e', '#23b2fa', '#a672b3', '#b28046', '#23f794', '#1d65d1', '#f563ff', '#f0ab22', '#18ad7c', '#a3c8ff', '#e359b5']
        return colors[id % 32];
    };

    return {
        teams: teams,
        update: update,
        distinctColor: distinctColor,
        subscribe: function (cb) {
            _subscribers.push(cb);
            cb(teams);
        }
    };
});
