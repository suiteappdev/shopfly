angular.module('app').controller("barrioController", ["$scope","$rootScope", "$modal", "toaster", "$API", function($scope, $rootScope, $modal, toaster, $API){

	$scope.Load = function(){

	}

	$scope.Update = function(barrio){
		$scope.setBarrio = angular.copy(barrio);

		var modalInstance = $modal.open({
	        templateUrl: 'editar_barrio.html',
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
	      			$API.Barrio.Update($scope.setBarrio).then(function(res){
	      				if(res.status == 200){
	      					$rootScope.barrios[$rootScope.barrios.indexOf(barrio)] = res.data;
	      					toaster.pop("success","Barrio", "Actualizado");
	      				}
	      			});      				
      			}
      		}
		);
	}

	$scope.Del = function(barrio){
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
      				$API.Barrio.Delete(barrio._id).then(function(res){
      					if(res.status == 200){
      						toaster.pop("warning","Barrio", "Barrio Eliminado");
      						$rootScope.barrios.splice($rootScope.barrios.indexOf(barrio), 1);
      					}
      				});
      			}
      		}, 
      		function(val){
      			console.log(val);
  		});
	}
}]);