angular.module('app').controller("firmarController", ["$stateParams","$scope","$rootScope", "$modal", "toaster", "$API", "$timeout", "$fileManagerService", "$docFlyConf", function($stateParams, $scope, $rootScope, $modal, toaster, $API, $timeout, $fileManagerService, $docFlyConf){
	$scope.signs = [];

	$scope.Load = function(){
		$scope.pages = [];
		PDFJS.workerSrc ='assets/vendor/pdfjs/pdf.worker.js';
		PDFJS.getDocument($docFlyConf.base + 'file/' + $stateParams.url + '/' + $stateParams.hash + '/' + $stateParams.file).then(function(pdf) {
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

	$scope.removeFirma = function(event, firma){
		event.preventDefault();
		event.stopPropagation();

		$scope.signs.splice($scope.signs.indexOf(firma), 1);
	}

	$scope.importSignature = function(file){
    	var canvas = angular.element('<canvas></canvas>')[0];
		var context = canvas.getContext('2d');
		var img = new Image();

		img.onload = function(){
			context.drawImage(img, 0, 0, 400, 200);
			context.save();
			
			$scope.signs.push({
				page  : $scope.selected,
				sign  : canvas.toDataURL('image/png'),
				offsetX : 0,
				offsetY : 0
			});

			$scope.$apply();			
		}

	    img.src = file.files[0].path;
	}

	$scope.build = function(){
		if($scope.signs.length  == 0){
			toaster.pop("error","Error", "Debe firmar almenos una pagina.");
		}

		var doc = new jsPDF('p','mm','a4');
		$scope.draw();

		$timeout(function(){
			for (var i = 0; i < $scope.pages.length; ++i) {
		    	var canvas = angular.element('#cvx-' + $scope.pages[i].pageNumber)[0];
				var context = canvas.getContext('2d');
	        	doc.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 0, 0);
	        	
	        	if(i < $scope.pages.length - 1){
		    		doc.addPage();
	        	}
			};

			var buffer = new Buffer(doc.output('datauri').replace(/^data:application\/pdf;base64,/, ""), 'base64');
			
			$fileManagerService.fs.writeFile($stateParams.path, buffer, "binary", function (err) {
				if(err){
					return console.log(err);
				}
				
				$timeout(function(){
					toaster.pop("success","Firmado", "Documento firmado Correctamente.");
				}, 1000);
				
				history.back();						
			});

		}, 3000);

	}


	$scope.draw = function(){
		angular.forEach($scope.pages, function(page){
	    	var canvas = angular.element('#cvx-' + page.pageNumber)[0];
			var context = canvas.getContext('2d');
        	var imgData = canvas.toDataURL('image/jpeg');

			angular.forEach($scope.signs, function(sign){
				if(page.pageNumber == sign.page){
					var img = new Image();

	        		img.onload = function(){
	        			context.drawImage(img, sign.offsetX, sign.offsetY, sign.width || 300, sign.height || 150);
	        			context.save();
	        		}

	        		img.src = sign.sign;
				}
			});
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
	        			sign  : $scope.signature.toDataURL("image/jpg"),
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
	        			ctx.drawImage(img, 10, 10);
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
		var scale = 1.3;
		var viewport = _page.getViewport(scale);

		var renderContext = {
		  canvasContext: context,
		  viewport: viewport
		};

		_page.render(renderContext);
	}
}]);