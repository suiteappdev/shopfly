angular.module("app").directive("ngBranch", function(){
	function ctrl($rootScope, $scope, $window, $API){
		$API.Sucursal.List().then(function(data){
			$scope.branches = data || [];
		})
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
		templateUrl : "tpl/fields/branch.html",
		link : link
	}
});