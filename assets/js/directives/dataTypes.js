function ngIs(){
	function link($scope, $element, $attr){
		angular.element($element).bind('keypress', function($event){
			if(!new RegExp($attr.ngPattern).test(String.fromCharCode($event.keyCode))){
				return false;
			}
		});
	}

	return {
		restrict : "A",
		replace : false,
		link : link
	}	
}

angular.module("app").directive("ngIs", ngIs)