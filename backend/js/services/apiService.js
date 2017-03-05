backendApp.factory('apiService', ['$http', '$rootScope', function($http, $rootScope) {
    var baseURL = 'https://api.pio-x.ch';
    if(window.location.host == "localhost") {
        baseURL = '../api';
        if(window.location.pathname.substr("passcodes.html")) {
            baseURL = window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/')) + '/../api';
        }
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
        },
        imageUrl: function (image_ID) {
            return baseURL + '/image/' + image_ID + '.jpg?hash=' + localStorage.getItem('hash');
        }
    }
}]);