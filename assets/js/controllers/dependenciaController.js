angular.module('app').controller("dependenciaController", ["$scope","$http", '$modal', "toaster", "$rootScope", function($scope, $http, $modal, toaster, $rootScope){
	$scope.load = function(){
		$http.get("http://boruto:3000/docdependencia").success(function(data){
			$scope.dependencias = data;
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
		$http.post("http://boruto:3000/docdependencia", {
			id : $scope.dependencia.nombre,
			parent : $scope.selectedNode ? $scope.selectedNode.node.text : null
		}).success(function(data){
			$scope.load();
			if($scope.dependencia) delete $scope.dependencia;
        	toaster.pop("success", "Listo!", "Creado Correctamente");
		});
	}

	$scope.Update = function(){
		$http.put("http://boruto:3000/docdependencia/" + $scope.selectedNode.node.id, {
			text : $scope.selectedNode.node.text
		}).success(function(data){
        	toaster.pop("success","Actualizado", "se ha actualizado Correctamente");
        	$scope.$close();
        	$scope.load();
		});

	}

	$scope.Remove = function(){
      var modalInstance = $modal.open({
        templateUrl: 'confirm.html',
        scope : $scope,
        controller : function($scope){
        	$scope.ok = function(){
				$http.delete("http://boruto:3000/docdependencia/" + $scope.selectedNode.node.id).success(function(data){
					$rootScope.$broadcast('deleted_dependencia');
		        	toaster.pop("success","Eliminado", "se ha eliminado Correctamente");
		        	$scope.$close();
				});         		
        	}
        }
      });
	}
}]);

angular.module('app').controller("dependenciaModalController", ["$scope","$http", '$modal', "toaster","$rootScope", function($scope, $http, $modal, toaster, $rootScope){
	$scope.Update = function(){
		$http.put("http://boruto:3000/docdependencia/" + $scope.selectedNode.node.id, {
			text : $scope.selectedNode.node.text
		}).success(function(data){
        	toaster.pop("success","Actualizado", "se ha actualizado Correctamente");
        	$scope.$close();

        	$rootScope.$broadcast("updated_dependencia", data);
		});
	}
}]);