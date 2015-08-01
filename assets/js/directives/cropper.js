angular.module("app").directive("ngImagePicker", function($rootScope){
	function ctrl($rootScope, $scope, $modal){

	    $scope.open = function (size) {
	      var modalInstance = $modal.open({
		        templateUrl: 'cropper.html',
		        scope : $scope,
		        controller : function($scope, $rootScope){
					$scope.myCroppedImage = '';
					$scope.cropType = 'circle';
				    $scope.crop = function(){
				    	$rootScope.cropped = $scope.myCroppedImage;
				    	$scope.$close();
				    }
		        }
	      });

	    };
	}

	function link($scope, $element, $attr){
		var _input = angular.element(angular.element.find('#fileInput')[0]);
		_input.on('change', function(evt){
		      var file = evt.currentTarget.files[0];
		      var reader = new FileReader();
		      
		      reader.onload = function (evt) {
			        $scope.$apply(function($scope){
				          $scope.myImage = evt.target.result;
			        });

		          	$scope.open();
		      };

	      	  reader.readAsDataURL(file);  
		});
	}

	return {
		restrict : "A",
		controller : ctrl,
		replace : false,
		templateUrl : "tpl/util/cropper.html",
		link : link
	}
});