backendApp.controller('riddleCtrl', function($scope, apiService, riddleService){
    $scope.riddles = [];
    $scope.riddleService = riddleService;
    $scope.riddleService.subscribe(function(riddles) {
        $scope.riddles = riddles;
    });

    $scope.newRiddle = {};
    $scope.emptyNewRiddle = function() {
        $scope.newRiddle = {
            pos_lat: "",
            pos_long: "",
            title: "",
            question: "",
            dep_ID: "",
            answer: "",
            answer_options: [],
            answer_options_enabled: 0,
            type: "SINGLE",
            points: 50,
            answer_required: 1,
            image_required: 0
        };
    };
    $scope.emptyNewRiddle();
    $scope.addNewRiddle = function(data) {
        apiService.post('/riddle', data)
            .then(function(){
                $scope.riddleService.update();
                $scope.emptyNewRiddle();
            });
    };
    $scope.deleteRiddle = function(id) {
        apiService.delete('/riddle/' + id)
            .then(function(){
                $scope.riddleService.update();
            });
    };
    $scope.updateRiddle = function(id, data) {
        apiService.put('/riddle/' + id, data)
            .then(function(){
                $scope.riddleService.update();
            });
    };
});
