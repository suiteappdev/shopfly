angular.module('app').controller("cargoController", ["$scope","$rootScope", "$modal", "toaster", "$API", function($scope, $rootScope, $modal, toaster, $API){

	$scope.Load = function(){
		$API.Cargo.List().then(function(res){
			$scope.cargos = res.data || [];
		});
	}

	$scope.Create = function(){
		$API.Cargo.Create($scope.cargo).then(function(res){
			if(res.status == 200){
				$scope.cargos.push(res.data);
	      		toaster.pop("success","Cargo", "Creado");
	      		delete $scope.cargo;
			}
		});
	}

	$scope.Update = function(cargo){
		$scope.setCargo = angular.copy(cargo);

		var modalInstance = $modal.open({
	        templateUrl: 'editar_cargo.html',
	        size : 'sm',
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
	      			$API.Cargo.Update($scope.setCargo).then(function(res){
	      				if(res.status == 200){
	      					$scope.cargos[$scope.cargos.indexOf(cargo)] = res.data;
	      					toaster.pop("success","Cargo", "Actualizado");
	      				}
	      			});      				
      			}
      		}
		);
	}

	$scope.Del = function(cargo){
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
	      				$API.Cargo.Delete(cargo._id).then(function(res){
	      					if(res.status == 200){
	      						$scope.cargos.splice($scope.cargos.indexOf(cargo), 1);
	      						toaster.pop("warning","Cargo", "Borrado");
	      					}
	      				});
	      			}
	      		}
  			);
	}
}]);