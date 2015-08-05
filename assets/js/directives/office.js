angular.module("app").directive("ngOffice", function(){
	function ctrl($rootScope, $scope, $window, $API){
		$API.Cargo.List().then(function(res){
			$scope.offices = res.data || [];
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
		templateUrl : "tpl/fields/office.html",
		link : link
	}
});