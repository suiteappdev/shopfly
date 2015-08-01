angular.module("app").directive("ngLinePrice", function(){
	function ctrl($rootScope, $scope, $window, $API){
		$API.LineaPrecio.List().then(function(data){
			$scope.line_prices = data || [];
		})

		$rootScope.$watch('line_price', function(n, o){
			try{
				$rootScope.line_price = n;
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
		templateUrl : "tpl/fields/line_price.html",
		link : link
	}
});