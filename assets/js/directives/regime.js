angular.module("app").directive("ngRegime", function(){
	function ctrl($rootScope, $scope, $window){
		$scope.regime = $window.regime;

		$rootScope.$watch('regime', function(n, o){
			try{
				$rootScope.regime = n;
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
			ngModel : "=ngModel",
			ngLabel : "@",
			ngPlaceholder : '@'
		},
		templateUrl : "tpl/fields/regime.html",
		link : link
	}
});