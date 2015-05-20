angular.module("app").directive("ngGender", function(){
	function ctrl($rootScope, $scope, $window){
		$scope.gender = $window.gender;

		$rootScope.$watch('gender', function(n, o){
			$scope.$parent.gender = n;
		});
	}

	function link($scope){

	}

	return {
		restrict : "EA",
		controller : ctrl,
		scope : {
			ngLabel : "@",
			ngPlaceholder : '@'
		},
		templateUrl : "tpl/fields/gender.html",
		link : link
	}
});