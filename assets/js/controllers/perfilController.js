angular.module('app').controller("perfilController", ["$scope", function($scope){

	$scope.load = function(){
		$scope.perfiles = [
			"Administrador",
			"Vendedor",
			"Cajero",
			"Supervisor",
			"Bodega"
		];
	}

	$scope.create = function(){
		$scope.perfiles.push($scope.perfil.name);
	}

	$scope.update = function(){

	}

	$scope.del = function(perfil){
		$scope.perfiles.splice($scope.perfiles.indexOf(perfil), 1);
	}

}]);