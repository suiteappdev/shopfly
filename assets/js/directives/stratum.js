angular.module("app").directive("ngStratum", function(){
	function ctrl($rootScope, $scope, $window){
		$scope.stratum = $window.stratum;

		$rootScope.$watch('stratum', function(n, o){
			try{
				$rootScope.stratum = n;
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
			ngLabel : "@",
			ngPlaceholder : '@'
		},
		templateUrl : "tpl/fields/stratum.html",
		link : link
	}
});