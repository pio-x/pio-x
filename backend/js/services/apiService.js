backendApp.factory('apiService', ['$http', '$rootScope', function($http, $rootScope) {
    var baseURL = 'https://api.pio-x.ch';
    if(window.location.host == "localhost") {
        baseURL = 'http://localhost' + window.location.pathname + '../api';
    }
    return {
        get:function(url) {
            var config = {
                headers:  {
                    "X-Piox-Hash" : $rootScope.rHash
                }
            };
            return $http.get(baseURL + url, config );
        },
        post:function(url, data) {
            var config = {
                headers:  {
                    "X-Piox-Hash" : $rootScope.rHash
                }
            };
            return $http.post(baseURL + url, data, config );
        },
        put:function(url, data) {
            var config = {
                headers:  {
                    "X-Piox-Hash" : $rootScope.rHash
                }
            };
            return $http.put(baseURL + url, data, config );
        }
    }
}]);