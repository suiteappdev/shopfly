angular.module("app").directive("ngTaxpayerType", function(){
	function ctrl($rootScope, $scope, $window, $API){
		$API.TipoContribuyente.List().then(function(data){
			$scope.tipo_contribuyentes = data || [];
		})

		$rootScope.$watch('taxpayer_type', function(n, o){
			try{
				$rootScope.taxpayer_type = n;
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
		templateUrl : "tpl/fields/taxpayer.html",
		link : link
	}
});