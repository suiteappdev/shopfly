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

	$scope.onSelect = function($item, $model){
		var _exist = false;

		if(!$scope.plantilla.indice){
			$scope.plantilla.indice = [];
		}

		$scope.plantilla.indice.forEach(function(value){
			if(value._id == $item._id){
				_exist = true;
				return;
			}
		});	

		if(_exist){return}

		$scope.plantilla.indice.push($item);
	}

	$scope.removeIndice = function(indice){
		$scope.plantilla.indice.splice($scope.plantilla.indice.indexOf(indice), 1);
	}

	$scope.Update = function(plantilla){
		var modalInstance = $modal.open({
	        templateUrl: 'editar_plantilla.html',
	        size : 'md',
	        scope : $scope,
	        controller : function($scope){
	        	$scope.Load = function(){
	        		$scope.setPlantilla = angular.copy(plantilla);
	        		$scope.selectedIndices = $scope.setPlantilla.indice;
	        	}

				$scope.onSelect = function($item, $model){
					var _exist = false;

					$scope.setPlantilla.indice.forEach(function(value){
						if(value._id == $item._id){
							_exist = true;
							return;
						}
					});	

					if(_exist){return}

					$scope.setPlantilla.indice.push($item);
				}

				$scope.Del = function(indice){
					$scope.setPlantilla.indice.splice($scope.setPlantilla.indice.indexOf(indice), 1);
				}

	        	$scope.ok = function(){
	      			$API.Plantilla.Update($scope.setPlantilla).then(function(res){
	      				if(res.status == 200){
	      					toaster.pop("success","Plantilla", "Actualizada");
	      					$scope.$parent.plantillas[$scope.$parent.plantillas.indexOf(plantilla)] = res.data;
	        				$scope.$close(true);

	      				}
	      			});  	
	        	}
	        }
      	});
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