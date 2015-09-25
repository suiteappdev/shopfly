angular.module('app').controller("rolesController", ["$scope", "$API", "$modal", "toaster", "$window", function($scope, $API, $modal, toaster, $window ){

	$scope.Load = function(){
		$scope.permisos = $window.permisos;

		$API.Perfil.List().then(function(res){
			$scope.perfiles = res.data || [];
		});

		$API.Rol.List().then(function(res){
			if(res.status == 200){
				$scope.roles = res.data; 
			}
		});
	}

	$scope.permisionValue = function(value){
		angular.forEach($scope.permisos.formularios, function(form, key){
			if(value.id == form.parent){
				form.permisos = {};
				form.permisos.X = value.visible;
				form.permisos.R = value.visible;
				form.permisos.W = value.visible;
				form.permisos.D = value.visible;
			}
		})
	}

	$scope.Create = function(){
		$API.Rol.Create({
			perfil : $scope.rol.perfil,
			permiso : $scope.permisos
		}).then(function(res){
			if(res.status == 200){
	      		toaster.pop("success","Rol", "Creado.");
				$scope.roles.push(res.data);
			}
		});
	}

	$scope.Update = function(rol){
		$scope.setRol = angular.copy(rol);

		var modalInstance = $modal.open({
	        templateUrl: 'editar_roles.html',
	        size : 'lg',
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
	      			$API.Rol.Update($scope.setRol).then(function(res){
	      				if(res.status == 200){
	      					$scope.roles[$scope.roles.indexOf(rol)] = res.data;
	      					toaster.pop("success","Rol", "Actualizado");
	      				}
	      			});      				
      			}
      		}
		);º
	}

	$scope.Del = function(rol){
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
      				$API.Rol.Delete(rol._id).then(function(res){
      					if(res.status == 200){
      						toaster.pop("warning","Perfil", "Eliminado");
      						$scope.roles.splice($scope.roles.indexOf(rol), 1);
      					}
      				});
      			}
      		}, 
      		function(val){
      			console.log(val);
  		});
	}

}]);