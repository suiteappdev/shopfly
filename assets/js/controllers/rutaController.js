angular.module('app').controller("rutaController", ["$scope","$rootScope", "$modal", "toaster", "$API", function($scope, $rootScope, $modal, toaster, $API){

	$scope.Load = function(){
		$API.Ruta.List().then(function(res){
			$scope.rutas = res.data || [];
		});

		$API.Plantilla.List().then(function(res){
			$scope.plantillas = res.data || [];
		});

		$API.DocDependencia.List().then(function(res){
			$scope.dependencias = res.data || [];
		});

		$scope.paths = [];
	}

	$scope.Create = function(){
		$API.Ruta.Create({
			plantilla : $scope.plantilla,
			path : $scope.paths,
			estado : $scope.estado
		}).then(function(res){
			if(res.status == 200){
				toaster.pop("success","Ruta", "Creada");
				$scope.rutas.push(res.data)
				$scope.plantilla = null;
				$scope.paths = [];
			}else if(res.status == 409){
				toaster.pop("danger","Ruta", "Ya existe esta ruta.");
				$scope.plantilla = null;
				$scope.paths = [];
			}
		});
	}

	$scope.Update = function(ruta){
		$scope.setRuta = angular.copy(ruta);

		var modalInstance = $modal.open({
	        templateUrl: 'editar_ruta.html',
	        size : 'md',
	        scope : $scope,
	        controller : function($scope){
	        	$scope.ok = function(){
	      			$API.Ruta.Update($scope.setRuta).then(function(res){
	      				if(res.status == 200){
	      					toaster.pop("success","Ruta", "Actualizado");
	      					$scope.rutas[$scope.rutas.indexOf(ruta)] = res.data;
	      				}
	      			}); 
	        		$scope.$close(true);
	        	}
	        }
      	});
	}

	$scope.showPathView = function(paths){
		$scope.myPaths = paths;

		var modalInstance = $modal.open({
	        templateUrl: 'pathView.html',
	        scope : $scope,
	        size : 'md'
      	});
	}

	$scope.Del = function(ruta){
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
      				$API.Ruta.Delete(ruta._id).then(function(res){
      					if(res.status == 200){
      						toaster.pop("warning","Ruta", "Eliminado");
      						$scope.rutas.splice($scope.rutas.indexOf(ruta), 1);
      					}
      				});
      			}
      		}, 
      		function(val){
      			console.log(val);
  		});
	}

	$scope.changeState = function(path){
		var modalInstance = $modal.open({
	        templateUrl: 'confirm.html',
	        scope : $scope,
	        controller : function($scope, toaster){
	        	$scope.ok = function(){
					if(!path.estado){
						$API.Ruta.Inactivo(path._id).then(function(data){
							if(data) toaster.pop("warning","Ruta", "Desactivada");
						});

					}else{
						$API.Ruta.Activo(path._id).then(function(data){
        					if(data) toaster.pop("success","Ruta", "Activada");
						});
					}

					$scope.$dismiss({status : true});
	        	}

	        	$scope.cancel = function(){
	        		$scope.$close();
	        		path.estado = !path.estado;
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

	        	path.estado = !path.estado;
  		});
	}
}]);