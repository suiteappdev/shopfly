angular.module('app').controller("clienteController", ["$scope", "$API", "$modal", "toaster", "$rootScope", "$stateParams", function($scope, $API, $modal, toaster, $rootScope, $stateParams){

	$scope.load = function(){
		$scope.tab = "personal";
		$API.Cliente.List().then(function(data){
			$scope.clientes = data || [];
		});
		if($stateParams.id){
			$API.Cliente.Cliente($stateParams.id).then(function(cliente){
				$scope.cliente = cliente;
				$rootScope.cropped = cliente.metadata.foto;
				$rootScope.document = cliente.tipoDocumento;
				$rootScope.client_status = cliente.estado;
				$rootScope.phoneBook = cliente.metadata.telefono;
				$rootScope.cellularPhoneBook = cliente.metadata.celular;
				$rootScope.client_type = cliente.tipoCliente;
				$rootScope.faxBook = cliente.metadata.fax;
				$rootScope.birthday = cliente.metadata.fechaNacimiento;
				$rootScope.gender = cliente.metadata.sexo;
				$rootScope.marital_status = cliente.metadata.estadoCivil;
				$rootScope.education_level = cliente.metadata.nivelEstudio;
				$rootScope.regime = cliente.metadata.regimen;
				$rootScope.taxpayer_type = cliente.metadata.tipoContribuyente;
				$rootScope.stratum = cliente.metadata.estrato;
				$rootScope.location = cliente.metadata.localizacion;
				$rootScope.profile = cliente.metadata.perfil;
				$rootScope.office = cliente.metadata.cargo;
				$rootScope.line_price = cliente.metadata.lineaPrecio;
				$rootScope.enterprise = cliente.metadata.empresa;
			});
		}
	}

	$scope.Update  = function(){
		$API.Cliente.Update($scope.cliente._id,{
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

	$scope.changeState = function(cliente){
		var modalInstance = $modal.open({
	        templateUrl: 'confirm.html',
	        scope : $scope,
	        controller : function($scope, toaster){
	        	$scope.ok = function(){
					if(!cliente.estado.value){
						$API.Cliente.Inactivo(cliente._id).then(function(data){
							if(data) toaster.pop("warning","Desactivar", "Cliente Desactivado");
						});

					}else{
						$API.Cliente.Activo(cliente._id).then(function(data){
        					if(data) toaster.pop("success","Activar", "Cliente Activado");
						});
					}

					$scope.$dismiss({status : true});
	        	}

	        	$scope.cancel = function(){
	        		$scope.$close();
	        		cliente.estado.value = !cliente.estado.value;
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

	$scope.Search = function(){
		$API.Cliente.Search({
			estado 			: $rootScope.client_status ? $rootScope.client_status  :  null,
			documento 		: $scope.filter ? $scope.filter.numero  : null,
			cliente 		: $scope.cliente ? $scope.cliente : null,
			tipoCliente		: $rootScope.client_type ? $rootScope.client_type : null,
 		}).then(function(data){
			$scope.clientes = data;
		});
	}
}]);