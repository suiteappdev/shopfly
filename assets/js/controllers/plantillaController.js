angular.module('app').controller("plantillaController", ["$scope","$rootScope", "$modal", "toaster", "$API", function($scope, $rootScope, $modal, toaster, $API){

	$scope.Load = function(){
		
		$scope.indices = [];

		$API.Plantilla.List().then(function(res){
			$scope.plantillas = res.data || [];
		});

		$API.Indice.List().then(function(res){
			$scope.indices = res.data || [];
		});
	}


    $scope.someGroupFn = function (item){
        if (item.nombre[0] >= 'A' && item.nombre[0] <= 'M')
            return 'From A - M';

        if (item.nombre[0] >= 'N' && item.nombre[0] <= 'Z')
            return 'From N - Z';
    };

	$scope.Create = function(){
		$API.Plantilla.Create($scope.plantilla).then(function(res){
			if(res.status == 200){
				toaster.pop("success","Plantilla", "Creada");
				$scope.plantillas.push(res.data)
				delete $scope.plantilla;
			}
		});
	}

	$scope.Update = function(plantilla){
		$scope.setPlantilla = angular.copy(plantilla);

		var modalInstance = $modal.open({
	        templateUrl: 'editar_ruta.html',
	        size : 'md',
	        scope : $scope,
	        controller : function($scope){
	        	$scope.ok = function(){
	        		$scope.$close(true);
	        	}
	        }
      	});

      	modalInstance.result.then(
      		function(val){
      			if(val){
	      			$API.Plantilla.Update($scope.setPlantilla).then(function(res){
	      				if(res.status == 200){
	      					toaster.pop("success","Plantilla", "Actualizada");
	      					$scope.plantillas[$scope.plantillas.indexOf(plantilla)] = res.data;
	      				}
	      			});   				
      			}
      		}
		);
	}

	$scope.changeState = function(plantilla){
		var modalInstance = $modal.open({
	        templateUrl: 'confirm.html',
	        scope : $scope,
	        controller : function($scope, toaster){
	        	$scope.ok = function(){
					if(!plantilla.estado){
						$API.Plantilla.Inactivo(plantilla._id).then(function(data){
							if(data) toaster.pop("warning","Plantilla", "Desactivada");
						});

					}else{
						$API.Plantilla.Activo(plantilla._id).then(function(data){
        					if(data) toaster.pop("success","Plantilla", "Activada");
						});
					}

					$scope.$dismiss({status : true});
	        	}

	        	$scope.cancel = function(){
	        		$scope.$close();
	        		plantilla.estado = !plantilla.estado;
	        	}
	        }
      	});

      	modalInstance.result.then(
      		function(val){

      		}, 
      		function(val){
      			if(val.status){
      				return;
      			}

	        	cliente.estado = !cliente.estado;
  		});
	}

	$scope.Del = function(plantilla){
		var modalInstance = $modal.open({
	        templateUrl: 'confirm.html',
	        size : 'sm',
	        scope : $scope,
	        controller : function($scope){
	        	$scope.ok = function(){
	        		$scope.$close(true);
	        	}

	        	$scope.cancel  = function(){
	        		$scope.$close();
	        	}
	        }
      	});

      	modalInstance.result.then(
      		function(val){
      			if(val){
      				$API.Plantilla.Delete(plantilla._id).then(function(res){
      					if(res.status == 200){
      						toaster.pop("warning","Plantilla", "Eliminada");
      						$scope.plantillas.splice($scope.plantillas.indexOf(plantilla), 1);
      					}
      				});
      			}
      		}, 
      		function(val){
      			console.log(val);
  		});
	}
}]);