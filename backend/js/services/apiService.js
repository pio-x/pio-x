backendApp.factory('apiService', ['$http', '$rootScope', function($http, $rootScope) {
    var baseURL = window.pioxApiDomain;
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