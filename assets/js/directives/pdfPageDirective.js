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


		$rootScope.$on('doBuild', function(event, data){
			angular.forEach(data, function(sign){
				if($scope.ngPage.pageNumber == sign.page){
					var img = new Image();

	        		img.onload = function(){
	        			context.drawImage(img, sign.offsetX, sign.offsetY);
	        			context.save();
	        		}

	        		img.src = sign.sign;
				}
			});
		});
    }

    return {
      restrict : "E",
      replace : true,
      scope :{
        ngPage : '=',
        ngSelector : '@'
      },
      template : '<canvas id="cvx-{{ngSelector}}" height="1000", width="700"></canvas>',
      link : link
    }

  }]);

