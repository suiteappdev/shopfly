angular.module('app').controller("perfilController", ["$scope", "$API", "$modal", "toaster", function($scope, $API, $modal, toaster ){

	$scope.load = function(){
		$API.Perfil.List().then(function(res){
			$scope.perfiles = res.data || [];
		});
	}

	$scope.create = function(){
		$API.Perfil.Create({
			nombre : $scope.perfil.nombre
		}).then(function(res){
			if(res.status == 200){
	      		toaster.pop("success","Perfil", "Creado.");
				$scope.perfiles.push(res.data);
			}
		});
	}

	$scope.update = function(){

	}

	$scope.del = function(perfil){
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
      				$API.Perfil.Delete(perfil._id).then(function(res){
      					if(res.status == 200){
      						toaster.pop("warning","Perfil", "Eliminado");
      						$scope.perfiles.splice($scope.perfiles.indexOf(perfil), 1);
      					}
      				});
      			}
      		}, 
      		function(val){
      			console.log(val);
  		});
	}

}]);