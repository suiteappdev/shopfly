angular.module("app").directive("ngEnterpriseStatus", function(){
	function ctrl($rootScope, $scope, $window){
		$scope.enterprise_status = $window.enterprise_status;
	}

	function link($scope){

	}

	return {
		restrict : "EA",
		controller : ctrl,
		scope : {
			ngRequired : '@',
			ngLabel : "@",
			ngPlaceholder : '@'
		},
		templateUrl : "tpl/fields/enterprise_status.html",
		link : link
	}
});