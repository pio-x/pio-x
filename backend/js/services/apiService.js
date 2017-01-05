backendApp.factory('apiService', ['$http', function($http) {
    return {
        get:function(url) {
            return $http.get('https://api.pio-x.ch/' + url );
        },
        post:function(url, data) {
            return $http.post('https://api.pio-x.ch/' + url, data );
        },
        put:function(url, data) {
            return $http.put('https://api.pio-x.ch/' + url, data );
        }
    }
}]);