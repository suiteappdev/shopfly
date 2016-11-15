angular.module('app').controller("dependenciaController", ["$docFlyConf","$scope","$http", '$modal', "toaster", "$rootScope", "$window", "$API", "$timeout", function($docFlyConf, $scope, $http, $modal, toaster, $rootScope, $window, $API, $timeout){
	$scope.load = function(){
		$API.DocDependencia.List().then(function(res){
			$scope.dependencias = res.data ||[];
		});
	}

	$rootScope.$on('updated_dependencia', function(event, data){
		$scope.load();
	});

	$rootScope.$on('deleted_dependencia', function(event, data){
		$scope.load();
	});

    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: "dependenciaModalController",
        size: size,
        resolve: {
          selectedNode: function () {
            return this;
          }
        }
      });

    };

	$scope.Create = function(){
		$API.DocDependencia.Create({
			id : $scope.dependencia.nombre,
			parent : $scope.selectedNode ? $scope.selectedNode.node.id : null
		}).then(function(res){
			if(res.status == 200){
				toaster.pop("success","Dependencia", "Creada");
				$scope.load();

				if(res.data.parent == $docFlyConf.root){
						$window.mkdirp($docFlyConf.path + res.data.id, function (err) {
						    if (err) console.error(err)
	      					delete $scope.selectedNode;								    		
						});	
				}
				
				if($scope.dependencia){
					delete $scope.dependencia;
				} 
			}
		});
	}

	$scope.Update = function(){
		$API.DocDependencia.Update({
			id : $scope.selectedNode.node.id
		}).then(function(res){
        	toaster.pop("success","Actualizado", "se ha actualizado Correctamente");
        	$scope.$close();
        	$scope.load();
		});
	}

	$scope.Remove = function(){
      var modalInstance = $modal.open({
        templateUrl: 'confirm.html',
        size : 'sm',
        scope : $scope,
        controller : function($scope){
        	$scope.ok = function(){
        		console.log($scope.selectedNode.node);
        		if($scope.selectedNode.node.children.length > 0){
		        	toaster.pop("warning","Eliminado", "No Puede eliminar un elemento padre si contiene Hijos");
        			return;
        		}
        		
        		$API.DocDependencia.Delete($scope.selectedNode.node.id).then(function(res){
					$rootScope.$broadcast('deleted_dependencia');
		        	toaster.pop("success","Eliminado", "se ha eliminado Correctamente");
		        	delete $scope.selectedNode;
		        	$scope.$close();
        		});
        	}

        	$scope.cancel  = function(){
        		$scope.$close();
        	}
        }
      });
	}
}]);

angular.module('app').controller("dependenciaModalController", ["$scope","$http", '$modal', "toaster","$rootScope","$API", function($scope, $http, $modal, toaster, $rootScope, $API){
	$scope.Update = function(){
		$API.DocDependencia.Update({
			_id : $scope.selectedNode.node.id,
			text:$scope.selectedNode.node.text
		}).then(function(res){
        	toaster.pop("success","Actualizado", "se ha actualizado Correctamente");
        	$scope.$close();
        	$rootScope.$broadcast("updated_dependencia", true);
        	
		});
	}
}]);