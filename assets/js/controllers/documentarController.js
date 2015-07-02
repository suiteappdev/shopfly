angular.module('app').controller("documentarController", ["$scope","$rootScope", "$modal", "toaster", "$API",'$fileManagerService',  function($scope, $rootScope, $modal, toaster, $API, $fileManagerService){
	$scope.Load = function(){
		$scope.units = $fileManagerService.fileSize;

		$API.Ruta.List().then(function(res){
			$scope.rutas = res.data || [];
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

      	modalInstance.result.then(
      		function(val){
      			if(val){
	      			$API.Indice.Update($scope.setIndice).then(function(res){
	      				if(res.status == 200){
	      					toaster.pop("success","Indice", "Actualizado");
	      					$scope.indices[$scope.indices.indexOf(indice)] = res.data;
	      				}
	      			});      				
      			}
      		}
		);
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
