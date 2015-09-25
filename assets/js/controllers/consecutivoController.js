angular.module('app').controller("consecutivoController", ["$scope","$rootScope", "$modal", "toaster", "$API", function($scope, $rootScope, $modal, toaster, $API){

	$scope.Load = function(){
		$API.Consecutivo.List().then(function(res){
			$scope.consecutivos = res.data || [];
		});
	}

	$scope.Create = function(){
		$API.Consecutivo.Create($scope.consecutivo).then(function(res){
			if(res.status == 200){
	      		toaster.pop("success","Consecutivo", "Creado");
	      		$scope.consecutivos.push(res.data)
	      		delete $scope.consecutivo;
			}
		});
	}

	$scope.Update = function(consecutivo){
		$scope.setConsecutivo = angular.copy(consecutivo);

		var modalInstance = $modal.open({
	        templateUrl: 'editar_consecutivo.html',
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
	      			$API.Consecutivo.Update($scope.setConsecutivo).then(function(res){
	      				if(res.status == 200){
	      					$scope.consecutivos[$scope.consecutivos.indexOf(consecutivo)] = res.data;
	      					toaster.pop("success","Consecutivo", "Actualizado");
	      				}
	      			});      				
      			}
      		}
		);
	}

	$scope.Del = function(consecutivo){
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
      				$API.Consecutivo.Delete(consecutivo._id).then(function(res){
      					if(res.status == 200){
      						toaster.pop("success","Consecutivo", "Eliminado");
      						$scope.consecutivos.splice($scope.consecutivos.indexOf(consecutivo), 1);
      					}
      				});
      			}
      		}, 
      		function(val){
      			console.log(val);
  		});
	}
}]);