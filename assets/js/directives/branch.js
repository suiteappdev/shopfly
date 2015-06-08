angular.module("app").directive("ngBranch", function(){
	function ctrl($rootScope, $scope, $window, $API){
		$API.Sucursal.List().then(function(data){
			$scope.branches = data || [];
		})

		$rootScope.$watch('branch', function(n, o){
			try{
				$scope.ngModel = n;
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
		templateUrl : "tpl/fields/branch.html",
		link : link
	}
});