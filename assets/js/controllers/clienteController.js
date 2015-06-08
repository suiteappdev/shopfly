angular.module('app').controller("clienteController", ["$scope", "$API", "$rootScope", function($scope, $API, $rootScope){

	$scope.load = function(){
		$scope.tab = "personal";
	}

	$scope.create = function(){
		$API.Cliente.Create({
			estado 				: $scope.estado,
			tipoDocumento 		: $scope.cliente.documento,
			documento 			: $scope.cliente.numero,
			nombre 				: $scope.cliente.Nombres,
			apellido 			: $scope.cliente.Apellidos,
			razonSocial 		: $scope.cliente.razonSocial ? $scope.cliente.razonSocial : null,
			representanteLegal	: $scope.representanteLegal ? $scope.representanteLegal : null ,
			tipoCliente 		: $rootScope.client_type.descripcion,
			estado 				: $rootScope.client_status,
			metadata			:{
				pais 				: $rootScope.pais,
				departamento 		: $rootScope.departamento.name,
				ciudad 				: $rootScope.municipio.name,
				barrio 				: $rootScope.barrio.nombre,
				direccion 			: $scope.cliente.direccion,
				estrato 			: $rootScope.stratum,
				telefono 			: $scope.cliente.telefono,
				celular 			: $scope.cliente.celular,
				fax					: $scope.cliente.fax,
				email 				: $scope.cliente.email,
				foto 				: $scope.foto,
				estadoCivil 		: $rootScope.marital_status,
				sexo				: $rootScope.gender.name,
				fechaNacimiento 	: $scope.fechaNacimiento,
				sitioWeb 			: $scope.cliente.website,
				nivelEstudio 		: $rootScope.education_level,
				lineaPrecio 		: $rootScope.line_price.nombre,
				cargo 				: $rootScope.office.nombre,
				perfil 				: $rootScope.profile.nombre,
				empresa 			: $rootScope.enterprise.nombre,
				sucursal 			: $scope.cliente.sucursal,
				regimen 			: $rootScope.regime
			}
		}).then(function(data){

		});
	}

	$scope.update = function(){

	}

	$scope.del = function(){

	}

}]);