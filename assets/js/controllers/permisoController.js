angular.module('app').controller("permisoController", ["$scope","$rootScope", "$modal", "toaster", "$API", "$window", "$stateParams", function($scope, $rootScope, $modal, toaster, $API, $window, $stateParams){

	$scope.Load = function(){
		$scope.permisos = $window.permisos;

		$API.EstadoDocumento.List().then(function(res){
			$scope.estadoDocumentos = res.data.filter(function(estado){
				return estado.gestion;
			});
		});

		if($stateParams.usuario){
			$API.Usuario.Usuario($stateParams.usuario).then(function(res){
				if(res.status == 200){
					$scope.permisos = res.data.permiso || [];
					$scope.setCliente = res.data.cliente;
					$scope.usuario = res.data;
					$rootScope.client_status = res.data.estado;
				}
			});
		}

		$API.Rol.List().then(function(res){
			$scope.roles = res.data || [];
		});

	}

	$scope.onSelect = function($item, $model){
		$scope.permisos = $item.permiso;
	}

	$scope.Create = function(){
		$API.Usuario.Create(angular.toJson({
			usuario : $scope.usuario.usuario,
			perfil : $scope.usuario.perfil,
			password : $scope.usuario.password,
			cliente : $scope.setCliente,
			estado : $rootScope.client_status,
			permiso : $scope.permisos,
			metadata : {estadoDocumento : $scope.estadoDocumentos}
		})).then(function(res){
			if(res.status == 200){
				toaster.pop("success","Usuario", "Creado");
			}
		});
	}

	$scope.Update = function(){
		$API.Usuario.Update(angular.fromJson({
			_id : $scope.usuario._id,
			usuario : $scope.usuario.usuario,
			perfil  : $scope.usuario.perfil,
			password : $scope.usuario.password,
			cliente : $scope.setCliente,
			estado : $rootScope.client_status,
			metadata : {estadoDocumento : $scope.usuario.metadata.estadoDocumento},
			permiso : $scope.permisos
		})).then(function(res){
			if(res.status == 200){
				toaster.pop("success","Usuario", "Actualizado");
			}
		});
	}

	$scope.Del = function(banco){
		var modalInstance = $modal.open({
	        templateUrl: 'confirm.html',
	        size : 'md',
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
	      				$API.Banco.Delete(banco._id).then(function(res){
	      					if(res.status == 200){
	      						$scope.bancos.splice($scope.bancos.indexOf(banco), 1);
	      						toaster.pop("warning","Banco", "Borrado");
	      					}
	      				});
	      			}
	      		}
  			);
	}

	$scope.formClient = function(){
		var modalInstance = $modal.open({
	        templateUrl: 'listado_cliente.html',
	        scope : $scope,
	        controller : function($scope){
				
				$scope.setSelected = function(cliente){
			 		$scope.selected = cliente;
			 		$scope.$parent.setCliente = cliente;
				}

				$scope.ok = function(){
					$scope.$close(true);
				}

				$scope.cancel = function(){
					$scope.$close(false);
				}

				$scope.buscarCliente = function(){
					$API.Cliente.Search({
						estado 			: $rootScope.client_status ? $rootScope.client_status  :  null,
						documento 		: $scope.filter ? $scope.filter.numero  : null,
						cliente 		: $scope.cliente ? $scope.cliente : null,
						tipoCliente		: $rootScope.client_type ? $rootScope.client_type : null,
			 		}).then(function(res){
						$scope.clientes = res.data || [];
					});
				}
	        },
	        size : 'lg',
	        scope : $scope
      	});

      	modalInstance.result.then(
  			function(val){
  				if(!val){delete $scope.setCliente}
      		},
      		function(val){
      			if(typeof(val) != typeof(true)){
      				delete $scope.setCliente;
      			}else if(!val){
      				delete $scope.setCliente;
      			}
      		}
      	);
	}

	$scope.showPhoneBookView = function(phoneCollection){
		$scope.phoneCollection = phoneCollection;

		var modalInstance = $modal.open({
	        templateUrl: 'phoneBookView.html',
	        scope : $scope,
	        size : 'sm'
      	});
	}

	$scope.changeState = function(usuario){
		var modalInstance = $modal.open({
	        templateUrl: 'confirm.html',
	        size : 'sm',
	        scope : $scope,
	        controller : function($scope, toaster){
	        	$scope.ok = function(){
					if(!usuario.estado.value){
						$API.Usuario.Inactivo(usuario._id).then(function(data){
							if(data) toaster.pop("warning","Desactivar", "Usuario Desactivado");
						});

					}else{
						$API.Usuario.Activo(usuario._id).then(function(data){
        					if(data) toaster.pop("success","Activar", "Usuario Activado");
						});
					}

					$scope.$dismiss({status : true});
	        	}

	        	$scope.cancel = function(){
	        		$scope.$close();
	        		usuario.estado.value = !usuario.estado.value;
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

	        	usuario.estado.value = !usuario.estado.value;
  		});
	}

	$scope.Search = function(){
		$API.Usuario.Search({
			estado 			: $rootScope.client_status ? $rootScope.client_status  :  null,
			documento 		: $scope.filter ? $scope.filter.numero  : null,
			cliente 		: $scope.cliente ? $scope.cliente : null
 		}).then(function(res){
			$scope.Usuarios = res.data || [];
		});
	}
}]);