(function(angular) {
  'use strict';
angular.module('app').directive('ngDraggable', ['$document', function($document) {
    
    function link($scope, element, attrs){
      $(element).resizable({
        minHeight : 100,
        minWidth : 200,
        maxHeight : 200,
        maxWidth : 400,
        handles: 'se',
        stop : function(e, ui){
          $scope.$parent.sign.width = ui.size.width;
          $scope.$parent.sign.height =  ui.size.height;
        }
      }).draggable({
        containment : $scope.ngContainment,
        start : function(){
        
        },
        drag : function(){
        
        },

        stop : function(event, ui){
          $scope.$parent.sign.offsetX =  $(element[0]).position().left;
          $scope.$parent.sign.offsetY =  $(element[0]).position().top;
        }
      })
    }

    return {
      restrict : "A",
      scope :{
        ngContainment : '@',
        ngX : '=',
        ngY : '=',
        ngWidth : '=',
        ngHeight : '=',
      },
      link : link
    }

  }]);
})(window.angular);