angular.module("app").directive("ngClientType", function(){
	function ctrl($rootScope, $scope, $window, $API){
		$API.TipoCliente.List().then(function(data){
			$scope.client_types = data || [];
		})

		$rootScope.$watch('client_type', function(n, o){
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
			ngLabel : "@",
			ngPlaceholder : '@'
		},
		templateUrl : "tpl/fields/client_type.html",
		link : link
	}
});