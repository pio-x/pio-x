backendApp.directive('ngConfirmClick', [function() {
    return {
        priority: 100,
        restrict: 'A',
        link: {
            pre: function(scope, element, attrs){ //<---------
                element.bind('click touchstart', function(e){
                    var message = attrs.ngConfirmClick;
                    if(message && !window.confirm(message)){
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                });
            }
        }
    }
}]);