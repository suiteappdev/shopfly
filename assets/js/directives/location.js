angular.module("app").directive("ngLocation", function(){
	function ctrl($rootScope, $scope, $window){
		$scope.departamentos = $window.departamentos;
		$scope.municipios = $window.municipios;

		$rootScope.$watch('location.departamento', function(n, o){
			$scope.$parent.departamento = n;
		});

		$rootScope.$watch('location.municipio', function(n, o){
			$scope.$parent.municipio = n;
		});
	}

	function link($scope){

	}

	return {
		restrict : "EA",
		controller : ctrl,
		scope : {
			ngLabelDepartamento : "@",
			ngLabelMunicipio : '@',
			ngPlaceholderDepartamento : '@',
			ngPlaceholderMunicipio  : '@',
		},
		templateUrl : "tpl/fields/location.html",
		link : link
	}
});