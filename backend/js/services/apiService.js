backendApp.factory('apiService', ['$http', '$rootScope', function($http, $rootScope) {
    var baseURL = 'https://api.pio-x.ch';
    if(window.location.host == "localhost") {
        baseURL = 'http://localhost' + window.location.pathname + '../api';
    }
    return {
        get:function(url) {
            var config = {
                headers:  {
                    "X-Piox-Hash" : localStorage.getItem('hash')
                }
            };
            return $http.get(baseURL + url, config );
        },
        post:function(url, data) {
            var config = {
                headers:  {
                    "X-Piox-Hash" : localStorage.getItem('hash')
                }
            };
            return $http.post(baseURL + url, data, config );
        },
        put:function(url, data) {
            var config = {
                headers:  {
                    "X-Piox-Hash" :localStorage.getItem('hash')
                }
            };
            return $http.put(baseURL + url, data, config );
        },
        delete:function(url) {
            var config = {
                headers:  {
                    "X-Piox-Hash" : localStorage.getItem('hash')
                }
            };
            return $http.delete(baseURL + url, config );
        }
    }
}]);