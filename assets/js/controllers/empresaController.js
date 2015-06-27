angular.module('app').controller("empresaController", ["$scope", "$rootScope", "$modal", "toaster", "$API","$stateParams",  function($scope, $rootScope, $modal, toaster, $API, $stateParams){

	$scope.Load = function(){
		$rootScope.clearCustomFields();

		$API.Empresa.List().then(function(res){
			$scope.empresas = res.data || [];
		});

		if($stateParams.id){
			$API.Empresa.Empresa($stateParams.id).then(function(res){
				$scope.empresa = res.data;
				$rootScope.faxBook = $scope.empresa.metadata.fax;
				$rootScope.phoneBook = $scope.empresa.metadata.telefono;
				$rootScope.cellularPhoneBook = $scope.empresa.metadata.celular;
				$rootScope.location = $scope.empresa.localizacion;
				$rootScope.enterprise_status = $scope.empresa.estado;
			});
		}

	}

	$scope.Create = function(){
		$API.Empresa.Create({
			nombre 				: $scope.empresa.nombre,
			nit 				: $scope.empresa.nit,
			representanteLegal 	: $scope.empresa.representanteLegal,
			razonSocial 		: $scope.empresa.razonSocial,
			localizacion	 	: $rootScope.location,
			direccion			: $scope.empresa.direccion,
			estado				: $rootScope.enterprise_status,
			metadata : {
				email 		: $scope.empresa.email,
				sitioWeb	: $scope.empresa.sitioWeb,
				telefono 	: $rootScope.phoneBook,
				fax 		: $rootScope.faxBook,
				celular		: $rootScope.cellularPhoneBook
			}
		}).then(function(res){
			if(res.status == 200){
				toaster.pop("success","Empresa", "Creada");
				delete $scope.empresa;
				$rootScope.clearCustomFields();
			}
		});
	}

	$scope.showPhoneBookView = function(phoneCollection){
		$scope.phoneCollection = phoneCollection;

		var modalInstance = $modal.open({
	        templateUrl: 'phoneBookView.html',
	        scope : $scope,
	        size : 'sm'
      	});
	}

	$scope.changeState = function(empresa){
		var modalInstance = $modal.open({
	        templateUrl: 'confirm.html',
	        size : 'sm',
	        scope : $scope,
	        controller : function($scope, toaster){
	        	$scope.ok = function(){
					if(!empresa.estado.value){
						$API.Empresa.Inactivo(empresa._id).then(function(data){
							if(data) toaster.pop("warning","Empresa", "Desactivado");
						});

					}else{
						$API.Empresa.Activo(empresa._id).then(function(data){
        					if(data) toaster.pop("success","Empresa", "Activado");
						});
					}

					$scope.$dismiss({status : true});
	        	}

	        	$scope.cancel = function(){
	        		$scope.$close();
	        		empresa.estado.value = !empresa.estado.value;
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

	        	empresa.estado = !empresa.estado;
  		});
	}

	$scope.Update = function(){
		$API.Empresa.Update({
			_id					: $scope.empresa._id,
			nombre 				: $scope.empresa.nombre,
			nit 				: $scope.empresa.nit,
			representanteLegal 	: $scope.empresa.representanteLegal,
			razonSocial 		: $scope.empresa.razonSocial,
			localizacion	 	: $rootScope.location,
			direccion			: $scope.empresa.direccion,
			estado				: $rootScope.enterprise_status,
			metadata : {
				email 		: $scope.empresa.email,
				sitioWeb	: $scope.empresa.sitioWeb,
				telefono 	: $rootScope.phoneBook,
				fax         : $rootScope.faxBook,
				celular		: $rootScope.cellularPhoneBook
			}

		}).then(function(res){
			if(res.status == 200){
				toaster.pop("success","Empresa", "Creada");
			}
		});
	}

	$scope.Search = function(){
		$API.Empresa.Search({
			empresa : $scope.empresaFilter
 		}).then(function(res){
			$scope.empresas = res.data;
		});
	}

	$scope.Del = function(){

	}

}]);