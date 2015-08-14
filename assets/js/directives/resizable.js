(function(angular) {
  'use strict';
angular.module('app').directive('ngResizable', ['$document', function($document) {
    
    function link($scope, element, attrs){
      $(element).resizable();
    }

    return {
      restrict : "A",
      link : link
    }
    
  }]);
})(window.angular);