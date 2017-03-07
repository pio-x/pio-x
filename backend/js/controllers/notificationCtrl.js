backendApp.controller('notificationCtrl', function($scope, apiService){
    $scope.getNotifications = function() {
        apiService.get('/notification').then(function(articlesResponse) {
            $scope.notifications = articlesResponse.data;
        });
    };
    $scope.getNotifications();
    $scope.newNotification = {};
    $scope.emptyNewNotification = function() {
        $scope.newNotification = {
            title: "",
            text: "",
            timestamp: "",
            t_ID: ""
        };
    };
    $scope.emptyNewNotification();
    $scope.updateNotification = function(data) {
        apiService.put('/notification', data)
            .then(function(){
                $scope.getNotifications();
            });
    };
    $scope.addNewNotification = function(data) {
        apiService.post('/notification', data)
            .then(function(){
                $scope.getNotifications();
                $scope.emptyNewNotification();
            });
    };
    $scope.deleteNotification = function(id) {
        apiService.delete('/notification/' + id)
            .then(function(){
                $scope.getNotifications();
            });
    };
});
