angular.module("app").directive("ngGender", function(){
	function ctrl($rootScope, $scope, $window){
		$scope.gender = $window.gender;

		$rootScope.$watch('gender', function(n, o){
			try{
				$rootScope.gender = n;
			}catch(e){

			}
		});
	}

	function link($scope){

	}

	return {
		restrict : "EA",
		scope : true,
		controller : ctrl,
		scope : {
			ngLabel : "@",
			ngPlaceholder : '@'
		},
		templateUrl : "tpl/fields/gender.html",
		link : link
	}
});