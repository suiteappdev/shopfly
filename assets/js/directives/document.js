angular.module("app").directive("ngDocument", function(){
	function ctrl($rootScope, $scope, $window){
		$scope.documents = $window.documents;

		$rootScope.$watch('document', function(n, o){
			$scope.$parent.documento = n;
		});
	}

	function link($scope){

	}

	return {
		restrict : "EA",
		controller : ctrl,
		scope : {
			ngLabel : "@",
			ngPlaceholder : '@'
		},
		templateUrl : "tpl/fields/document.html",
		link : link
	}
});