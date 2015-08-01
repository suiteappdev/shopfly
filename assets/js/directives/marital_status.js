angular.module("app").directive("ngMaritalStatus", function(){
	function ctrl($rootScope, $scope, $window){
		$scope.marital_status = $window.marital_status;

		$rootScope.$watch('marital_status', function(n, o){
			try{
				$rootScope.marital_status = n;
			}catch(e){}
		});
	}

	function link($scope){

	}

	return {
		restrict : "EA",
		controller : ctrl,
		scope:true,
		scope : {
			ngLabel : "@",
			ngPlaceholder : '@'
		},
		templateUrl : "tpl/fields/marital_status.html",
		link : link
	}
});