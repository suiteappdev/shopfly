angular.module("app").directive("ngEnterprise", function(){
	function ctrl($rootScope, $scope, $window, $API){
		$API.Empresa.List().then(function(data){
			$scope.enterprises = data || [];
		})

		$rootScope.$watch('enterprise', function(n, o){
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
		templateUrl : "tpl/fields/enterprise.html",
		link : link
	}
});