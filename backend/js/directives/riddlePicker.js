backendApp.directive('riddlePicker', function(riddleService) {
  return {
      restrict: 'E',
      templateUrl: 'js/view/riddle-picker.html',
      scope: {
          selected: '='
      },
      link: function(scope, elem, attrs) {
        scope.riddles = [];
        riddleService.subscribe(function(riddles) {
            scope.riddles = riddles;
        });
      }
  };
});