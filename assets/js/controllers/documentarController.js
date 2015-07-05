angular.module('app').controller("documentarController", ["$scope","$rootScope", "$modal", "toaster", "$API","$fileManagerService", "$printerService", "$docFlyConf", "$cryptoService", function($scope, $rootScope, $modal, toaster, $API, $fileManagerService, $printerService, $docFlyConf, $cryptoService){
	$scope.Load = function(){
		$scope.units = $fileManagerService.fileSize;

		$API.Ruta.List().then(function(res){
			$scope.rutas = res.data || [];
		});

		$printerService.getPrinters()('test', function(err, result){
			$scope.prints = result;
		});

	}

	$scope.remove = function(file){
		$scope.myFiles.splice($scope.myFiles.indexOf(file), 1);
	}

	$scope.onSelect = function($item, $model){
		$scope.setRuta = angular.copy($item);

		var modalInstance = $modal.open({
	        templateUrl: 'documentar.html',
	        size : 'md',
	        scope : $scope,
	        controller : 'documentarController'
      	});
	}

	$scope.ok = function(){
		var _targetPath = $cryptoService.encodeHmac($scope.setRuta.plantilla.indice.map(function(v){ return v.value}).join(""), "sha1")

		$fileManagerService.createDir(
			$fileManagerService.path.join(
				$docFlyConf.path,
				$scope.dest.path,
				_targetPath 
				), function(e){
					if(e) throw(e);

					angular.forEach($scope.myFiles, function(v, k){
						var _filename = $fileManagerService.path.join($docFlyConf.path, $scope.dest.path, _targetPath, v.name);
						
						$fileManagerService.copy(v.path, _filename, function(e){
							if(e) throw(e);
						});
					});
				});
	}

	$scope.today = function() {
		$scope.dt = new Date();
	};

	$scope.today();

	$scope.clear = function () {
	$scope.dt = null;
	};

	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened = true;
	};

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
}]);
