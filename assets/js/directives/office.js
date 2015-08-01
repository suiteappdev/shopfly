angular.module("app").directive("ngOffice", function(){
	function ctrl($rootScope, $scope, $window, $API){
		$API.Cargo.List().then(function(data){
			$scope.offices = data || [];
		})

		$rootScope.$watch('office', function(n, o){
			try{
				$rootScope.office = n;
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
		templateUrl : "tpl/fields/office.html",
		link : link
	}
});