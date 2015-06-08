angular.module("app").directive("ngProfile", function(){
	function ctrl($rootScope, $scope, $window, $API){
		$API.Perfil.List().then(function(data){
			$scope.perfiles = data || [];
		})

		$rootScope.$watch('profile', function(n, o){
			try{
				$rootScope.profile = n;
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
		templateUrl : "tpl/fields/profile.html",
		link : link
	}
});