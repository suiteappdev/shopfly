angular.module("app").directive("ngEducationLevel", function(){
	function ctrl($rootScope, $scope, $window){
		$scope.education_level = $window.education_level;

		$rootScope.$watch('education_level', function(n, o){
			try{
				$rootScope.education_level = n;
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
		templateUrl : "tpl/fields/education_level.html",
		link : link
	}
});