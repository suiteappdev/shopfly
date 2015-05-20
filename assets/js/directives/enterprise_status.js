angular.module("app").directive("ngEnterpriseStatus", function(){
	function ctrl($rootScope, $scope, $window){
		$scope.enterprise_status = $window.enterprise_status;

		$rootScope.$watch('enterprise_status', function(n, o){
			$scope.$parent.enterprise_status = n;
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
		templateUrl : "tpl/fields/enterprise_status.html",
		link : link
	}
});