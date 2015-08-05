angular.module("app").directive("ngProfile", function(){
	function ctrl($rootScope, $scope, $window, $API){
		$API.Perfil.List().then(function(res){
			$scope.perfiles = res.data || [];
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
			ngPlaceholder : '@'
		},
		templateUrl : "tpl/fields/profile.html",
		link : link
	}
});