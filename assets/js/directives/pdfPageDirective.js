angular.module('app').directive('ngPagePdf', ['$document', "$rootScope", "$q", function($document, $rootScope, $q) {
    function link($scope, element, attrs){
    	var canvas = angular.element(element)[0];
		var context = canvas.getContext('2d');
		var scale = 1;
		var viewport = $scope.ngPage.getViewport(scale);
		
		var renderContext = {
		  canvasContext: context,
		  viewport: viewport
		};

		$scope.ngPage.render(renderContext);
    }

    return {
      restrict : "E",
      replace : true,
      scope :{
        ngPage : '=',
        ngSelector : '@'
      },
      template : '<canvas id="cvx-{{ngSelector}}" height="1000", width="700" style="display:none;"></canvas>',
      link : link
    }

  }]);

