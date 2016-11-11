angular.module('app').controller("permisoController", ["$scope","$rootScope", "$modal", "toaster", "$API", "$window", "$stateParams", function($scope, $rootScope, $modal, toaster, $API, $window, $stateParams){

	$scope.Load = function(){
		$scope.permisos = $window.permisos;
		$scope.misPlantillas = [];
		$scope.misEstados = [];
	
		$API.EstadoDocumento.List().then(function(res){
			/*$scope.estadoDocumentos = res.data.filter(function(estado){
				return estado.gestion;
			});*/

			$scope.estadoDocumentos = res.data || [];
		});

		$API.Ruta.List().then(function(res){
			$scope.rutas = res.data || [];
		});

		if($stateParams.usuario){
			$API.Usuario.Usuario($stateParams.usuario).then(function(res){
				if(res.status == 200){
					console.log("plantillas del usuer", res.data)
					$scope.permisos = res.data.permiso || [];
					$scope.extenciones = res.data.permiso.extention;
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
	
	$scope.extenciones = [
		{ext : 'pdf', value:false},
		{ext : 'jpeg', value:false},
		{ext : 'tif', value:false},
		{ext : 'docx', value:false},
		{ext : 'gif', value:false},
		{ext : 'png', value:false},
		{ext : 'txt', value:false},
		{ext : 'zip', value:false},
		{ext : 'rar', value:false},
		{ext : 'xlsx', value:false},
		{ext : 'xls', value:false}
	];

	$scope.removePlantilla = function(plantilla){
		if(!$stateParams.usuario){
			$scope.misPlantillas.splice($scope.misPlantillas.indexOf(plantilla), 1);
			return;
		}
		
		$scope.usuario.misPlantillas.splice($scope.usuario.misPlantillas.indexOf(plantilla), 1);
	}

	$scope.removeEstado = function(estado){
		if(!$stateParams.usuario){
			$scope.misEstados.splice($scope.misEstados.indexOf(estado), 1);
			return;
		}

		$scope.usuario.misEstados.splice($scope.usuario.misEstados.indexOf(estado), 1);
	}

	$scope.agregarEstados= function(){
		var modalInstance = $modal.open({
	        templateUrl: 'agregar_estados.html',
	        size : 'md',
	        scope : $scope,
	        controller : function($scope){

	        	$scope.Load = function(){
					$API.EstadoDocumento.List().then(function(res){
						/*$scope.estadoDocumentos = res.data.filter(function(estado){
							return estado.gestion;
						});*/

						$scope.estadoDocumentos = res.data || []
					});
	        	}

	        	$scope.agregarEstado = function(add, estado){
	        		var exist = false;

	        		if($stateParams.usuario){
	        			estado.subscribed = true;
		        		if(add){
		        			angular.forEach($scope.$parent.usuario.misEstados, function(value, key){
		        				if(value._id == estado._id){
		        					exist = true;
		        				}
		        			});

			        		if(exist) return;
			        		$scope.$parent.usuario.misEstados.push(estado);	        			
		        		}else{
							$scope.$parent.usuario.misEstados.splice($scope.$parent.usuario.misEstados.indexOf(estado), 1);	        			
		        		}	
	        		}else{
	        			estado.subscribed = true;
		        		if(add){
		        			angular.forEach($scope.$parent.misEstados, function(value, key){
		        				if(value._id == estado._id){
		        					exist = true;
		        				}
		        			});

			        		if(exist) return;
			        		$scope.$parent.misEstados.push(estado);	        			
		        		}else{
							$scope.$parent.misEstados.splice($scope.$parent.misEstados.indexOf(estado), 1);	        			
		        		}	        			
	        		}
	        	}
	        }
	    })
	}

	$scope.editarPlantillaUsuario = function(plantilla){
		$scope.setPlantilla = angular.copy(plantilla);
		
		var modalInstance = $modal.open({
	        templateUrl: 'editar_plantilla_usuario.html',
	        size : 'md',
	        scope : $scope,
	        controller : function($scope){

	        	$scope.Load = function(){
					$API.Ruta.List().then(function(res){
						$scope.rutas = res.data.filter(function(ruta){
							return ruta.plantilla._id == $scope.setPlantilla.plantilla._id;
						});
					});
	        	}

	        	$scope.exist = function(index){
	        		return $scope.setPlantilla.path[index] ? $scope.setPlantilla.path[index].visible  : false;
	        	}

	        	$scope.agregarPlantilla = function(){
	        		if($stateParams.usuario){
	        			angular.forEach($scope.$parent.usuario.misPlantillas, function(value, key){
	        				if($scope.setPlantilla.plantilla._id == value.plantilla._id){
	        					$scope.$parent.usuario.misPlantillas[key] = $scope.rutas[0];
	        					console.log($scope.$parent.usuario.misPlantillas[key])
	        				}
	        			});
	        		}

	        		$scope.$close();
	        	}

	        }
	    })
	}

	$scope.agregarPlantillas= function(){
		var modalInstance = $modal.open({
	        templateUrl: 'agregar_plantillas.html',
	        size : 'md',
	        scope : $scope,
	        controller : function($scope){

	        	$scope.Load = function(){
					$API.Ruta.List().then(function(res){
						$scope.rutas = res.data || [];
					});
	        	}

	        	$scope.agregarPlantilla = function(plantilla){
	        		var exist = false;
	        		if($stateParams.usuario){
	        			angular.forEach($scope.$parent.usuario.misPlantillas, function(value, key){
	        				if(plantilla.plantilla._id == value._id){
	        					exist = true;
	        				}
	        			})

	        			if(exist) return;
		        		$scope.$parent.usuario.misPlantillas.push(plantilla);

	        		}else{
	        			angular.forEach($scope.$parent.misPlantillas, function(value, key){
	        				if( plantilla.plantilla._id == value._id){
	        					exist = true;
	        				}
	        			})

	        			if(exist) return;
		        		$scope.$parent.misPlantillas.push(plantilla);
	        		}

	        		$scope.$close();
	        	}

	        }
	    })
	}

	$scope.removeDependencia = function(dependencia){
		$scope.misDependencias.splice($scope.misDependencias.indexOf(dependencia), 1);

	}

	$scope.permisionValue = function(value){
		angular.forEach($scope.permisos.formularios, function(form, key){
			if(value.id == form.parent){
				form.permisos = {};
				form.permisos.X = value.visible;
				form.permisos.R = value.visible;
				form.permisos.W = value.visible;
				form.permisos.D = value.visible;
			}
		})
	}

	$scope.onSelect = function($item, $model){
		$scope.permisos = $item.permiso;
	}


	$scope.Create = function(){
		$scope.permisos.extention = $scope.extenciones;

		$API.Usuario.Create(angular.toJson({
			usuario : $scope.usuario.usuario,
			perfil : $scope.usuario.perfil,
			password : $scope.usuario.password,
			cliente : $scope.setCliente,
			estado : $rootScope.client_status,
			misPlantillas : $scope.misPlantillas.map(function(obj){return obj._id}),
			permiso : $scope.permisos,
			misEstados : $scope.misEstados.map(function(obj){return obj._id})
		})).then(function(res){
			if(res.status == 200){
				toaster.pop("success","Usuario", "Creado");
				$scope.userForm.$setPristine();
				$scope.usuario = {};
				delete $scope.setCliente;
				delete $rootScope.client_status;
				$scope.misEstados.length = 0;
				$scope.misPlantillas.length = 0;
				$scope.Load();
			}
		});
	}

	$scope.Update = function(){
		$scope.permisos.extention = $scope.extenciones;
		$API.Usuario.Update(angular.fromJson({
			_id : $scope.usuario._id,
			usuario : $scope.usuario.usuario,
			perfil  : $scope.usuario.perfil,
			password : $scope.usuario.password ? $scope.usuario.password  : null,
			cliente : $scope.setCliente,
			estado : $rootScope.client_status,
			misPlantillas : $scope.usuario.misPlantillas.map(function(obj){return obj._id}),
			misEstados : $scope.usuario.misEstados.map(function(obj){return obj._id}), 
			permiso : $scope.permisos
		})).then(function(res){
			if(res.status == 200){
				toaster.pop("success","Usuario", "Actualizado");
				$scope.formUserUpdate.$setPristine();
				$scope.usuario = {};
				delete $scope.setCliente;
				delete $rootScope.client_status;
				$scope.misEstados.length = 0;
				$scope.misPlantillas.length = 0;
				$scope.Load();
				window.history.back();
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