angular.module('app').controller("estadoDocumentoController", ["$scope","$rootScope", "$modal", "toaster", "$API", function($scope, $rootScope, $modal, toaster, $API){

	$scope.Load = function(){
		$API.EstadoDocumento.List().then(function(res){
			$scope.estadosDocumentos = res.data || [];
		})
	}

	$scope.Create = function(){
		$API.EstadoDocumento.Create($scope.estado).then(function(res){
			if(res.status == 200){
				toaster.pop("success","Estado", "Creado");
				$scope.estadosDocumentos.push(res.data)
				delete $scope.estado;
			}
		});
	}

	$scope.changeState = function(estado){
		var modalInstance = $modal.open({
	        templateUrl: 'confirm.html',
	        size : "sm",
	        scope : $scope,
	        controller : function($scope, toaster){
	        	$scope.ok = function(){
					if(!estado.gestion){
						$API.EstadoDocumento.Inactivo(estado._id).then(function(data){
							if(data) toaster.pop("warning","Desactivar", "Estado Desactivado");
						});

					}else{
						$API.EstadoDocumento.Activo(estado._id).then(function(data){
        					if(data) toaster.pop("success","Activar", "Estado Activado");
						});
					}

					$scope.$dismiss({status : true});
	        	}

	        	$scope.cancel = function(){
	        		$scope.$close();
	        		estado.gestion = !estado.gestion;
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

	        	estado.gestion = !estado.gestion;
  		});
	}

	$scope.Update = function(estado){
		$scope.setEstado = angular.copy(estado);

		var modalInstance = $modal.open({
	        templateUrl: 'editar_estadoDocumento.html',
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
	      			$API.EstadoDocumento.Update($scope.setEstado).then(function(res){
	      				if(res.status == 200){
	      					toaster.pop("success","Estado", "Actualizado");
	      					$scope.estadosDocumentos[$scope.estadosDocumentos.indexOf(estado)] = res.data;
	      				}
	      			});   				
      			}
      		}
		);
	}

	$scope.Del = function(estado){
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
      				$API.EstadoDocumento.Delete(estado._id).then(function(res){
      					if(res.status == 200){
      						toaster.pop("warning","Estado", "Eliminado");
      						$scope.estadosDocumentos.splice($scope.estadosDocumentos.indexOf(estado), 1);
      					}
      				});
      			}
      		}, 
      		function(val){
      			console.log(val);
  		});
	}


}]);