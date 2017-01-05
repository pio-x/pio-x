backendApp.factory('apiService', ['$http', function($http) {
    var baseURL = 'https://api.pio-x.ch';
    if(window.location.host == "localhost") {
        baseURL = 'http://localhost' + window.location.pathname + '../api';
    }
    return {
        get:function(url) {
            return $http.get(baseURL + url );
        },
        post:function(url, data) {
            return $http.post(baseURL + url, data );
        },
        put:function(url, data) {
            return $http.put(baseURL + url, data );
        }
    }
}]);