angular.module("app").directive("ngFile", function($rootScope, toaster){
	function link($scope, $element, $attr){
		var _element = angular.element($element);
		var rootScope = $scope.$root;

		$scope.myFiles = [];

		_element.on('change', function(evt){
			$scope.$apply(function(){
				for (var i = 0; i < evt.currentTarget.files.length; i++) {
					var ext =  evt.currentTarget.files[i].path.split('.').pop();
					var found = false;
					console.log(rootScope);

					if(!rootScope.credential.user.permiso.extention){
						toaster.pop("error","inhabilitado", "no tienes un tipo de archivo asociado.");
						return;
					}


					var found

					angular.forEach(rootScope.credential.user.permiso.extention, function(obj){
						if(obj.ext == ext && !obj.value){
							found = true;
							return;
						}	
					});

					if(found){
						toaster.pop("error","inhabilitado", "No puedes subir este tipo de archivos.");
						return;
					}

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