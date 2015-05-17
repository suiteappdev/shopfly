angular.module("app").directive("ngLocation", function(){
	function ctrl(){
		$scope.paises = [];
		$scope.departamentos = [];
	}

	function link(){

	}

	return {
		restrict : "EA",
		controller : ctrl,
		scope : {
			ngLabel : "@",
			ngPlaceholder : "@"
		}
	}
});