backendApp.directive('riddlePicker', function(riddleService) {
  return {
      restrict: 'E',
      templateUrl: 'js/templates/directives/riddle-picker.html',
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