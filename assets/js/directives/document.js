angular.module("app").directive("ngDocument", function(){
	function ctrl($rootScope, $scope, $window){
		$scope.documents = $window.documents;

		$rootScope.$watch('document', function(n, o){
			try{
				$scope.ngModel= n;
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
		templateUrl : "tpl/fields/document.html",
		link : link
	}
});