angular.module("app").directive("ngEducationLevel", function(){
	function ctrl($rootScope, $scope, $window){
		$scope.education_level = $window.education_level;
	}

	function link($scope){

	}

	return {
		restrict : "EA",
		controller : ctrl,
		scope : true,
		scope : {
			ngLabel : "@",
			ngPlaceholder : '@',
			ngDisable	: '@'
		},
		templateUrl : "tpl/fields/education_level.html",
		link : link
	}
});