angular.module('app').controller("indiceController", ["$scope","$rootScope", "$modal", "toaster", "$API", function($scope, $rootScope, $modal, toaster, $API){

	$scope.Load = function(){
		$API.Indice.List().then(function(res){
			$scope.indices = res.data || [];
		});
	}

	$scope.Create = function(){
		$API.Indice.Create($scope.indice).then(function(res){
			if(res.status == 200){
				toaster.pop("success","Indice", "Creado");
				$scope.indices.push(res.data)
				delete $scope.indice;
			}
		});
	}

	$scope.Update = function(indice){
		$scope.setIndice = angular.copy(indice);

		var modalInstance = $modal.open({
	        templateUrl: 'editar_indice.html',
	        size : 'md',
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
	      			$API.Indice.Update($scope.setIndice).then(function(res){
	      				if(res.status == 200){
	      					toaster.pop("success","Indice", "Actualizado");
	      					$scope.indices[$scope.indices.indexOf(indice)] = res.data;
	      				}
	      			});      				
      			}
      		}
		);
	}

	$scope.Del = function(indice){
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
      				$API.Indice.Delete(indice._id).then(function(res){
      					if(res.status == 200){
      						toaster.pop("warning","Indice", "Eliminado");
      						$scope.indices.splice($scope.indices.indexOf(indice), 1);
      					}
      				});
      			}
      		}, 
      		function(val){
      			console.log(val);
  		});
	}
}]);