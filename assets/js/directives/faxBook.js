angular.module("app").directive("ngFaxBook", function($rootScope, toaster){
	function ctrl($rootScope, $scope, $modal){
		
		$rootScope.$watch('faxBook', function(n, o){
			try{
				$rootScope.faxBookNumber = n[0];
			}catch(e){}
		}, true);

	    $scope.showFaxBook = function (size) {
	      var modalInstance = $modal.open({
		        templateUrl: 'faxBook.html',
		        size : 'sm',
		        controller : function($scope, $rootScope){
		        	$rootScope.faxBook = $rootScope.faxBook ? $rootScope.faxBook : [];

		        	$scope.addphoneNumber = function(){
		        		$rootScope.faxBook.push($scope.number);
		        		toaster.pop("success","Contacto", "Has agregado un nuevo Fax");
		        		delete $scope.number;
		        	}	

		        	$scope.deletePhoneNumber = function(phone){
		        		$rootScope.faxBook.splice($rootScope.faxBook.indexOf(phone), 1);
		        		toaster.pop("warning","Contacto", "Fax Borrado.");
		        	}

		        	$scope.cancel = function(){
		        		$scope.$close();
		        	}
		        }
	      });

	    };
	}

	function link($scope, $element, $attr){

	}

	return {
		restrict : "E",
		controller : ctrl,
		replace : true,
		templateUrl : "tpl/fields/faxBook.html",
		link : link
	}
});