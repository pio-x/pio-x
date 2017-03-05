backendApp.directive('teamPicker', function(teamService) {
  return {
      restrict: 'E',
      templateUrl: 'js/view/team-picker.html',
      scope: {
          selected: '='
      },
      link: function(scope, elem, attrs) {
        scope.teams = [];
        teamService.subscribe(function(teams) {
            scope.teams = teams;
        });
      }
  };
});