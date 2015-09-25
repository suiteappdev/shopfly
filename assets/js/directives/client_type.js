angular.module("app").directive("ngClientType", function(){
	function ctrl($rootScope, $scope, $window, $API){
		$API.TipoCliente.List().then(function(res){
			$scope.client_types = res.data || [];
		})
	}

	function link($scope){

	}

	return {
		restrict : "EA",
		controller : ctrl,
		scope : true,
		scope : {
			ngLabel : "@",
			ngPlaceholder : '@',
			ngClear : '@'
		},
		templateUrl : "tpl/fields/client_type.html",
		link : link
	}
});