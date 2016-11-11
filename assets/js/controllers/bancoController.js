angular.module('app').controller("bancoController", ["$scope","$rootScope", "$modal", "toaster", "$API", function($scope, $rootScope, $modal, toaster, $API){

	$scope.Load = function(){
		$API.Banco.List().then(function(res){
			$scope.bancos = res.data || [];
		});
	}

	$scope.Create = function(){
		$API.Banco.Create({
			nombre : $scope.banco
		}).then(function(res){
			if(res.status == 200){
				$scope.bancos.push(res.data);
	      		toaster.pop("success","Banco", "Creado");
	      		delete $scope.banco;
			}
		});
	}

	$scope.Update = function(banco){
		$scope.setBanco = angular.copy(banco);

		var modalInstance = $modal.open({
	        templateUrl: 'editar_banco.html',
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
	      			$API.Banco.Update($scope.setBanco).then(function(res){
	      				if(res.status == 200){
	      					toaster.pop("success","Banco", "Actualizado");
	      					$scope.Load();
	      				}
	      			});      				
      			}
      		}
		);
	}

	$scope.Del = function(banco){
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
	      				$API.Banco.Delete(banco._id).then(function(res){
	      					if(res.status == 200){
	      						$scope.bancos.splice($scope.bancos.indexOf(banco), 1);
	      						toaster.pop("warning","Banco", "Borrado");
	      					}
	      				});
	      			}
	      		}
  			);
	}
}]);