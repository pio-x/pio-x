backendApp.controller('passcodeCtrl', function($scope, apiService){
    $scope.getCodes = function() {
        apiService.get('/passcode').then(function(articlesResponse) {
            $scope.passcodes = articlesResponse.data;
        });
    };
    $scope.getCodes();
    $scope.newCode = {
        code: "",
        points: 500,
        mrx_ID: 1
    };
    $scope.emptyNewCode = function() {
        $scope.newCode.code = "";
    };
    $scope.addNewCode = function(data) {
        apiService.post('/passcode', data)
            .then(function(){
                $scope.getCodes();
                $scope.emptyNewCode();
            });
    };
    $scope.deleteCode = function(id) {
        apiService.delete('/passcode' + id)
            .then(function(){
                $scope.getCodes();
            });
    };
    $scope.updateCode = function(id, data) {
        apiService.put('/passcode/'+ id, data)
            .then(function(){
                $scope.getCodes();
            });
    };
});
