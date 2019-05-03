backendApp.directive('riddleOptions', function() {
  return {
      restrict: 'E',
      templateUrl: 'js/templates/directives/riddle-options.html',
      scope: {
          answer: '=',
          options: '='
      },
      link: function(scope, elem, attrs) {
          if (!scope.options) {
              scope.options = [''];
          } else {
              if (typeof scope.options == 'string') {
                  scope.options = JSON.parse(scope.options);
              }
          }
          scope.addOption = function() {
              scope.options.push('')
          };
          scope.removeOption = function(index) {
              scope.options.splice(index, 1);
              if (scope.options.length === 0) {
                  scope.options = [''];
              }
          };
      }
  };
});
