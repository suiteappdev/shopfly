angular.module("app").directive("ngMaritalStatus", function(){
	function ctrl($rootScope, $scope, $window){
		$scope.marital_status = $window.marital_status;

		$rootScope.$watch('marital_status', function(n, o){
			$scope.$parent.marital_status = n;
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
		templateUrl : "tpl/fields/marital_status.html",
		link : link
	}
});