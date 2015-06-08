angular.module("app").directive("ngClientStatus", function(){
	function ctrl($rootScope, $scope, $window){
		$scope.client_status = $window.client_status;

		$rootScope.$watch('client_status', function(n, o){
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
		scope : true,
		controller : ctrl,
		scope : {
			ngModel : "=ngModel",
			ngLabel : "@",
			ngPlaceholder : '@'
		},
		templateUrl : "tpl/fields/client_status.html",
		link : link
	}
});