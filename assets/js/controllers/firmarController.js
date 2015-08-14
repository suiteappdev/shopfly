angular.module('app').controller("firmarController", ["$scope","$rootScope", "$modal", "toaster", "$API", function($scope, $rootScope, $modal, toaster, $API){
	$scope.signs = [];

	$scope.Load = function(){
		$scope.pages = [];
		PDFJS.workerSrc ='assets/vendor/pdfjs/pdf.worker.js';
		
		PDFJS.getDocument('http://HOUSE1989:3000/file/Docfly/Recursos%20Humanos/Hojas%20de%20Vida/c0f60f479ed0f6d1a5a263eb125b195414cad42e/Hoja%20de%20vida%20Andrew.pdf').then(function(pdf) {
			$scope.$apply(function(){
				$scope.numPages = pdf.numPages;
				for (var i = 0; i <= pdf.numPages; i++) {
					pdf.getPage(i).then(function(res){
						$scope.$apply(function(){
							$scope.pages.push(res);
						})
					})
				};
			})
		});
	}

	$scope.build = function(){
		var doc = new jsPDF();
		$rootScope.$broadcast("doBuild", $scope.signs);

		angular.forEach($scope.pages, function(page){
			var cvx = angular.element('#cvx-' + page.pageNumber)[0];
			cvx.getContext("2d");
			doc.addPage();
			doc.addImage(imgData, 'JPEG', 15, 40, 180, 160);
		});



	}

	$scope.getSigns = function(page){
		var _signs = [];

		angular.forEach($scope.signs, function(sign){
			if(sign.page == page){
				_signs.push(sign);
			}
		})

		return _signs;
	}

	$scope.getPosition = function(event){
 		var modalInstance = $modal.open({
	        templateUrl: 'sign.html',
	        scope : $scope,
	        size : "sm",
	        controller : function($scope){
	        	$scope.Load = function(){
	        		var canvas = angular.element('#signArea')[0];
	        		$scope.signature = new SignaturePad(canvas);
	        	}

	        	$scope.clear = function(){
	        		$scope.signature.clear();
	        	}

	        	$scope.drawImage = function(){
	        		$rootScope.sign =  $scope.signature.toDataURL();
	        		$scope.$close();
	        		
	        		$scope.signs.push({
	        			page  : $scope.selected,
	        			sign  : $scope.signature.toDataURL(),
	        			offsetX : event.offsetX,
	        			offsetY : event.offsetY
	        		})
	        	}
	        },
      	});
	}

	$scope.sign = function(){
		var modalInstance = $modal.open({
	        templateUrl: 'sign.html',
	        scope : $scope,
	        size : "sm",
	        controller : function($scope){
	        	$scope.Load = function(){
	        		var canvas = angular.element('#signArea')[0];
	        		$scope.signature = new SignaturePad(canvas);
	        	}

	        	$scope.clear = function(){
	        		$scope.signature.clear();
	        	}

	        	$scope.drawImage = function(){
	        		$rootScope.sign =  $scope.signature.toDataURL();
	        		$scope.$close();
	        		$scope.drawPDF();
	        	}

	        	$scope.drawPDF = function(){
	        		var canvas = angular.element('#the-canvas')[0];
	        		var ctx = canvas.getContext("2d");
	        		var img = new Image();

	        		img.onload = function(){
	        			ctx.drawImage(img, 0, 0);
	        		}

	        		img.src = $scope.signature.toDataURL();
	        	}
	        },
      	});
	}

	$scope.setPage = function(page){
		$scope.selected = page.pageNumber;
		_page = $scope.pages[$scope.pages.indexOf(page)];

		var canvas = document.getElementById('the-canvas');
		var context = canvas.getContext('2d');
		var scale = 1;
		var viewport = _page.getViewport(scale);

		var renderContext = {
		  canvasContext: context,
		  viewport: viewport
		};

		_page.render(renderContext);
	}
}]);