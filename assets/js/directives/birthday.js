angular.module("app").directive("ngBirthday", function(){
	function ctrl($rootScope, $scope, $window){
	    $scope.clear = function () {
	      	$rootScope.birthday = null;
	    };

	    // Disable weekend selection
	    $scope.disabled = function(date, mode) {
	      	return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	    };

	    $scope.toggleMin = function() {
	      	$scope.minDate = $scope.minDate ? null : new Date();
	    };

    	$scope.toggleMin();

	    $scope.open = function($event) {
	      	$event.preventDefault();
	      	$event.stopPropagation();

	      	$scope.opened = true;
	    };

	    $scope.dateOptions = {
	      	formatYear: 'yy',
	      	startingDay: 1,
	      	class: 'datepicker'
	    };
	}

	function link($scope){

	}

	return {
		restrict : "EA",
		controller : ctrl,
		scope : {
			ngLabel : "@",
			ngPlaceholder : '@',
			ngFormat : "@",
			ngDisable : '@'
		},
		templateUrl : "tpl/fields/birthday.html",
		link : link
	}
});