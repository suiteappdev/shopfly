angular.module("app").directive("ngPhoneBook", function($rootScope, toaster){
	function ctrl($rootScope, $scope, $modal){
		
		$rootScope.$watch('phoneBook', function(n, o){
			try{
				$rootScope.phone = n[0];
			}catch(e){}
		}, true);
		
	    $scope.showPhoneBook = function () {
	      var modalInstance = $modal.open({
	      		size : 'sm',
		        templateUrl: 'phoneBook.html',
		        controller : function($scope, $rootScope){
		        	$rootScope.phoneBook = $rootScope.phoneBook ? $rootScope.phoneBook : [];

		        	$scope.addphoneNumber = function(){
		        		$rootScope.phoneBook.push($scope.number);
		        		toaster.pop("success","Contacto", "Has agregado un nuevo numero");
		        		delete $scope.number;
		        	}	

		        	$scope.deletePhoneNumber = function(phone){
		        		$rootScope.phoneBook.splice($rootScope.phoneBook.indexOf(phone), 1);
		        		toaster.pop("warning","Contacto", "Numero Borrado.");
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
		templateUrl : "tpl/fields/phoneBook.html",
		link : link
	}
});