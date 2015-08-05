angular.module('app').controller("clienteController", ["$scope", "$API", "$modal", "toaster", "$rootScope", "$stateParams", "$location", "$socket", function($scope, $API, $modal, toaster, $rootScope, $stateParams, $location, $socket){

	$scope.load = function(){
		$scope.tab = "personal";
		$API.Cliente.List().then(function(res){
			$scope.clientes = res.data || [];
		});

		$API.Perfil.List().then(function(res){
			$scope.perfiles = res.data;
		});

		if($stateParams.id){
			$API.Cliente.Cliente($stateParams.id).then(function(res){
				$scope.cliente = res.data;
				$rootScope.cropped = $scope.cliente.metadata.foto;
				$rootScope.document = $scope.cliente.tipoDocumento;
				$rootScope.client_status = $scope.cliente.estado;
				$rootScope.phoneBook = $scope.cliente.metadata.telefono;
				$rootScope.cellularPhoneBook = $scope.cliente.metadata.celular;
				$rootScope.client_type = $scope.cliente.tipoCliente;
				$rootScope.faxBook = $scope.cliente.metadata.fax;
				$rootScope.birthday = $scope.cliente.metadata.fechaNacimiento;
				$rootScope.gender = $scope.cliente.metadata.sexo;
				$rootScope.marital_status = $scope.cliente.metadata.estadoCivil;
				$rootScope.education_level = $scope.cliente.metadata.nivelEstudio;
				$rootScope.regime = $scope.cliente.metadata.regimen;
				$rootScope.taxpayer_type = $scope.cliente.metadata.tipoContribuyente;
				$rootScope.stratum = $scope.cliente.metadata.estrato;
				$rootScope.location = $scope.cliente.metadata.localizacion;
				$rootScope.profile = $scope.cliente.metadata.perfil;
				$rootScope.office = $scope.cliente.metadata.cargo;
				$rootScope.line_price = $scope.cliente.metadata.lineaPrecio;
				$rootScope.enterprise = $scope.cliente.metadata.empresa;
			});
		}
	}

	$scope.Update  = function(){
		$API.Cliente.Update({
			_id 				: $scope.cliente._id,
			tipoDocumento 		: $rootScope.document,
			documento 			: $scope.cliente.documento,
			nombre 				: $scope.cliente ? $scope.cliente.nombre : null,
			apellido 			: $scope.cliente ? $scope.cliente.apellido : null,
			razonSocial 		: $scope.cliente.razonSocial ? $scope.razonSocial : null,
			representanteLegal	: $scope.cliente.representanteLegal ? $scope.representanteLegal : null ,
			tipoCliente 		: $rootScope.client_type,
			estado 				: $rootScope.client_status,
			metadata			:{
				pais 				: $rootScope.country,
				direccion 			: $scope.cliente.metadata.direccion,
				localizacion		: $rootScope.location,
				estrato 			: $rootScope.stratum,
				telefono 			: $rootScope.phoneBook,
				celular 			: $rootScope.cellularPhoneBook,
				fax					: $rootScope.faxBook,
				email 				: $scope.cliente.metadata.email,
				foto 				: $rootScope.cropped,
				estadoCivil 		: $rootScope.marital_status,
				sexo				: $rootScope.gender,
				fechaNacimiento 	: $rootScope.birthday,
				sitioWeb 			: $scope.cliente.metadata.sitioWeb,
				nivelEstudio 		: $rootScope.education_level,
				lineaPrecio 		: $rootScope.line_price,
				cargo 				: $rootScope.office,
				perfil 				: $rootScope.profile,
				empresa 			: $rootScope.enterprise,
				sucursal 			: $scope.cliente.metadata.sucursal,
				regimen 			: $rootScope.regime,
				tipoContribuyente	: $rootScope.taxpayer_type
			}

		}).then(function(data){
			if(data.status == 200){
				toaster.pop("success","Cliente", "Cliente Actualizado");
				delete $scope.cliente;
				$rootScope.clearCustomFields();
				$scope.tab = "personal";
				$location.path("app/page/clientes");
			}
		});
	}

	$scope.create = function(){
		$API.Cliente.Create({
			estado 				: $scope.estado,
			tipoDocumento 		: $rootScope.document,
			documento 			: $scope.cliente.numero,
			nombre 				: $scope.cliente ? $scope.cliente.Nombres : null,
			apellido 			: $scope.cliente ? $scope.cliente.Apellidos : null,
			razonSocial 		: $scope.cliente.razonSocial ? $scope.cliente.razonSocial : null,
			representanteLegal	: $scope.cliente.representanteLegal ? $scope.cliente.representanteLegal : null ,
			tipoCliente 		: $rootScope.client_type,
			estado 				: $rootScope.client_status,
			metadata			:{
				pais 				: $rootScope.country,
				direccion 			: $scope.cliente.direccion,
				localizacion		: $rootScope.location,
				estrato 			: $rootScope.stratum,
				telefono 			: $rootScope.phoneBook,
				celular 			: $rootScope.cellularPhoneBook,
				fax					: $rootScope.faxBook,
				email 				: $scope.cliente.email,
				foto 				: $rootScope.cropped,
				estadoCivil 		: $rootScope.marital_status,
				sexo				: $rootScope.gender,
				fechaNacimiento 	: $rootScope.birthday,
				sitioWeb 			: $scope.cliente.website,
				nivelEstudio 		: $rootScope.education_level,
				lineaPrecio 		: $rootScope.line_price,
				cargo 				: $rootScope.office,
				perfil 				: $rootScope.profile,
				empresa 			: $rootScope.enterprise,
				sucursal 			: $scope.cliente.sucursal,
				regimen 			: $rootScope.regime,
				tipoContribuyente	: $rootScope.taxpayer_type
			}
		}).then(function(data){
			if(data.status == 409){
				toaster.pop("error", "Cliente", "Este Cliente Ya Existe");
				return;
			}

			toaster.pop("success","Cliente", "Cliente Creado Correctamente");
			delete $scope.cliente;
			$scope.formCliente.$setPristine();
			$rootScope.clearCustomFields();
			$scope.tab = "personal";
			$location.path("/app/page/clientes");
		})
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
	        scope : $scope,
	        controller : function($scope, toaster){
	        	$scope.ok = function(){
					if(!usuario.estado.value){
						$API.Cliente.Inactivo(usuario._id).then(function(data){
							if(data) toaster.pop("warning","Desactivar", "Usuario Desactivado");
						});

					}else{
						$API.Cliente.Activo(usuario._id).then(function(data){
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
		$API.Cliente.Search({
			estado 			: $rootScope.client_status ? $rootScope.client_status  :  null,
			tipoCliente 	: $rootScope.client_type ? $rootScope.client_type  :  null,
			documento 		: $scope.filter ? $scope.filter.numero  : null,
			cliente 		: $scope.cliente ? $scope.cliente : null,
 		}).then(function(res){
			$scope.clientes = res.data || [];
		});
	}
}]);