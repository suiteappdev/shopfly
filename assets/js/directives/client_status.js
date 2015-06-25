angular.module("app").directive("ngClientStatus", function(){
	function ctrl($rootScope, $scope, $window){
		$scope.client_status = $window.client_status;

		$rootScope.$watch('client_status', function(n, o){
			try{
				$rootScope.client_status = n;
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
		templateUrl : "tpl/fields/client_status.html",
		link : link
	}
});