angular.module("app").directive("ngDocument", function(){
	function ctrl($rootScope, $scope, $window){
		$scope.documents = $window.documents;
	}

	function link($scope){

	}

	return {
		restrict : "EA",
		controller : ctrl,
		scope : true,
		scope : {
			ngForm : '@',
			ngRequired : '@',
			ngLabel : "@",
			ngPlaceholder : '@'
		},
		templateUrl : "tpl/fields/document.html",
		link : link
	}
});