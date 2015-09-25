(function(angular) {
  'use strict';
angular.module('app').directive('ngResizable', ['$document', function($document) {
    
    function link($scope, element, attrs){
      $($(element)[0]).resizable();
    }

    return {
      restrict : "A",
      link : link
    }
    
  }]);
})(window.angular);