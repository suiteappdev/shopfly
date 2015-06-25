angular.module('app').controller("ivaController", ["$scope", "$API", "$modal", "toaster", function($scope, $API, $modal, toaster ){

	$scope.load = function(){
		$API.Iva.List().then(function(res){
			$scope.ivas = res.data || [];
		});
		console.log($API);
	}

	$scope.create = function(){
		$API.Iva.Create({
			valor : $scope.iva.valor
		}).then(function(res){
			if(res.status == 200){
	      		toaster.pop("success","Iva", "Creado.");
				$scope.ivas.push(res.data);
			}
		});
	}

	$scope.Update = function(iva){
		$scope.setIva = angular.copy(iva);
		
		var modalInstance = $modal.open({
	        templateUrl: 'editar_iva.html',
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
      				$API.Iva.Update($scope.setIva).then(function(res){
      					if(res.status == 200){
      						toaster.pop("success","Iva", "Actualizado.");
	      					$scope.ivas[$scope.ivas.indexOf(iva)] = res.data;
      					}
      				});
      			}
      		}, 
      		function(val){
      			console.log(val);
  		});
	}

	$scope.Del = function(iva){
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
      				$API.Iva.Delete(iva._id).then(function(res){
      					if(res.status == 200){
      						toaster.pop("warning","Iva", "Eliminado");
      						$scope.ivas.splice($scope.ivas.indexOf(iva), 1);
      					}
      				});
      			}
      		}, 
      		function(val){
      			console.log(val);
  		});
	}

}]);