(function(angular) {
  'use strict';
angular.module('app').directive('ngDraggable', ['$document', function($document) {
    
    function link($scope, element, attrs){
      console.log("scope offsetX", $scope.$parent.sign.offsetX)
      console.log("scope offsetY", $scope.$parent.sign.offsetY)
      
      $(element).draggable({
        containment : $scope.ngContainment,
        start : function(){
        
        },
        drag : function(){
        
        },

        stop : function(event, ui){
          $scope.$parent.sign.offsetX =  $(element[0]).position().left;
          $scope.$parent.sign.offsetY =  $(element[0]).position().top;
        }
      });
    }

    return {
      restrict : "A",
      scope :{
        ngContainment : '@',
        ngX : '=',
        ngY : '='
      },
      link : link
    }

  }]);
})(window.angular);