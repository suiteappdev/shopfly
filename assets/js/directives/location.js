angular.module("app").directive("ngLocation", function(){
	function ctrl($rootScope, $scope, $window, $API){
		$scope.departamentos = $window.departamentos;
		$scope.municipios = $window.municipios;

		$rootScope.$watch('location.departamento', function(n, o){
			try{
				$rootScope.departamento = n ;
			}catch(e){

			}
		});

		$rootScope.$watch('location.municipio', function(n, o){
			try{
				$rootScope.municipio = n;
			}catch(e){

			}
			
			$API.Barrio.List().then(function(data){
				$rootScope.barrios = data || [];
			});
		});

		$rootScope.$watch('location.barrio', function(n, o){
			try{
				$rootScope.barrio = n;
			}catch(e){

			}
		});
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