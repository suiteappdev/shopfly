angular.module("app").directive("ngFile", function($rootScope, toaster){
	function link($scope, $element, $attr){
		var _element = angular.element($element);
		
		$scope.myFiles = [];

		_element.on('change', function(evt){
			$scope.$apply(function(){
				for (var i = 0; i < evt.currentTarget.files.length; i++) {
					$scope.myFiles.push(evt.currentTarget.files[i]);
				};
			});
		});

	}

	return {
		restrict : "A",
		link : link
	}
});