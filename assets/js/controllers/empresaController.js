angular.module('app').controller("empresaController", ["$scope", "$rootScope", "$modal", "toaster", "$API","$stateParams",  function($scope, $rootScope, $modal, toaster, $API, $stateParams){

	$scope.Load = function(){
		$API.Empresa.List().then(function(res){
			$scope.empresas = res.data || [];
		});

		if($stateParams.id){
			$API.Empresa.Empresa($stateParams.id).then(function(res){
				$scope.empresa = res.data;
			});
		}

	}

	$scope.Create = function(){

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
					if(!empresa.estado){
						$API.empresa.Inactivo(empresa._id).then(function(data){
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
	        		empresa.estado = !empresa.estado;
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

	}

	$scope.Del = function(){

	}

}]);