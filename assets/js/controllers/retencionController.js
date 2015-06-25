angular.module('app').controller("retencionController", ["$scope","$rootScope", "$modal", "toaster", "$API", function($scope, $rootScope, $modal, toaster, $API){

	$scope.Load = function(){
		$API.Retencion.List().then(function(res){
			$scope.retenciones = res.data || [];
		});
	}

	$scope.Create = function(){
		$API.Retencion.Create({
			nombre : $scope.retencion.nombre,
			estado : $scope.retencion.estado ? $scope.retencion.estado : true,
			valor  : $scope.retencion.valor,
			base   : $scope.retencion.base
		}).then(function(res){
			if(res.status == 200){
				$scope.retenciones.push(res.data);
	      		toaster.pop("success","Retencion", "Creado");
	      		delete $scope.retencion;
			}
		});
	}

	$scope.Update = function(retencion){
		$scope.setRetencion = angular.copy(retencion);

		var modalInstance = $modal.open({
	        templateUrl: 'editar_retencion.html',
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
	      			$API.Retencion.Update($scope.setRetencion).then(function(res){
	      				if(res.status == 200){
	      					$scope.retenciones[$scope.retenciones.indexOf(retencion)] = res.data;
	      					toaster.pop("success","Retencion", "Actualizado");
	      				}
	      			});      				
      			}
      		}
		);
	}

	$scope.changeState = function(retencion){
		var modalInstance = $modal.open({
	        templateUrl: 'confirm.html',
	        scope : $scope,
	        controller : function($scope, toaster){
	        	$scope.ok = function(){
					if(!retencion.estado){
						$API.Retencion.Inactivo(retencion._id).then(function(data){
							if(data) toaster.pop("warning","Desactivado", "Retencion");
						});

					}else{
						$API.Retencion.Activo(retencion._id).then(function(data){
        					if(data) toaster.pop("success","Activado", "Retencion");
						});
					}

					$scope.$dismiss({status : true});
	        	}

	        	$scope.cancel = function(){
	        		$scope.$close();
	        		retencion.estado = !retencion.estado;
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

	        	cliente.estado.value = !cliente.estado.value;
  		});
	}

	$scope.Del = function(retencion){
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
	      				$API.Retencion.Delete(retencion._id).then(function(res){
	      					if(res.status == 200){
	      						$scope.retenciones.splice($scope.retenciones.indexOf(retencion), 1);
	      						toaster.pop("warning","Retencion", "Borrado");
	      					}
	      				});
	      			}
	      		}
  			);
	}
}]);