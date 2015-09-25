angular.module("app").directive("ngLocation", function(){
	function ctrl($rootScope, $modal, $scope, $window, $API){
		$scope.departamentos = $window.departamentos;
		$scope.municipios = $window.municipios;

		$scope.Load = function(){
			if($rootScope.location){
				$API.Barrio.BarrioByDepartamento($rootScope.location.municipio.code).then(function(res){
					$rootScope.barrios = res.data || [];
				});
			}
		}

		$scope.open = function(){
			var modalInstance = $modal.open({
		        templateUrl: 'barrio_quick.html',
		        size : 'sm',
		        controller  : function($scope, $rootScope,toaster, $API){
					$scope.Create = function(){
						$API.Barrio.Create({
							code : $scope.location.municipio.code,
							nombre : $scope.barrio.nombre
						}).then(function(data){
							if(data.status == 200){
								toaster.pop("success","Barrio", "Barrio Agregado");
								$rootScope.barrios.push(data.data);
								$rootScope.location.barrio = data.data;
								delete $scope.$parent.barrio;
								$scope.$close();
							}
						});
					}
		        }
	      	});

		}

		$scope.select = function(item, model){
			$API.Barrio.BarrioByDepartamento(item.code).then(function(res){
				$rootScope.barrios = res.data || [];
			});
		}	
	}

	function link($scope){
	}

	return {
		restrict : "EA",
		controller : ctrl,
		scope : true,
		scope : {
			ngLabelDepartamento : "@",
			ngLabelMunicipio : '@',
			ngPlaceholderDepartamento : '@',
			ngPlaceholderMunicipio  : '@',
			ngLabelBarrio : "@",
			ngPlaceholderBarrio  : '@'
		},
		templateUrl : "tpl/fields/location.html",
		link : link
	}
});