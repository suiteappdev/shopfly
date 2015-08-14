angular.module('app').controller("tipoClienteController", ["$scope", "$API", "$modal", "toaster", function($scope, $API, $modal, toaster ){

	$scope.Load = function(){
		$API.TipoCliente.List().then(function(res){
			$scope.tiposClientes = res.data || [];
		});
	}

	$scope.Create = function(){
		$API.TipoCliente.Create($scope.tipoCliente).then(function(res){
			if(res.status == 200){
	      		toaster.pop("success","Tipo de Cliente", "Creado.");
				$scope.tiposClientes.push(res.data);
				delete $scope.tipoCliente.descripcion;
			}
		});
	}

	$scope.Update = function(tipoCliente){
		$scope.setTipoCliente = angular.copy(tipoCliente);

		var modalInstance = $modal.open({
	        templateUrl: 'editar_tipoCliente.html',
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
	      			$API.TipoCliente.Update($scope.setTipoCliente).then(function(res){
	      				if(res.status == 200){
	      					toaster.pop("success","Tipo de Cliente", "Actualizado");
	      					$scope.tiposClientes[$scope.tiposClientes.indexOf(tipoCliente)] = res.data;
	      				}
	      			});   				
      			}
      		}
		);
	}

	$scope.changeState = function(tipoCliente){
		var modalInstance = $modal.open({
	        templateUrl: 'confirm.html',
	        scope : $scope,
	        controller : function($scope, toaster){
	        	$scope.ok = function(){
					if(!tipoCliente.estado){
						$API.TipoCliente.Inactivo(tipoCliente._id).then(function(data){
							if(data) toaster.pop("warning","Tipo", "Desactivado");
						});

					}else{
						$API.TipoCliente.Activo(tipoCliente._id).then(function(data){
        					if(data) toaster.pop("success","Ruta", "Activado");
						});
					}

					$scope.$dismiss({status : true});
	        	}

	        	$scope.cancel = function(){
	        		$scope.$close();
	        		tipoCliente.estado = !tipoCliente.estado;
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

	        	tipoCliente.estado = !tipoCliente.estado;
  		});
	}

	$scope.Del = function(tipoCliente){
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
      				$API.TipoCliente.Delete(tipoCliente._id).then(function(res){
      					if(res.status == 200){
      						$scope.tiposClientes.splice($scope.tiposClientes.indexOf(tipoCliente), 1);
      						delete tipoCliente;
      						toaster.pop("success","Tipo Cliente", "Eliminado");
      					}   
      				});
      			}
      		}, 
      		function(val){
      			console.log(val);
  		});
	}

}]);