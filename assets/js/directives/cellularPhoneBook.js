angular.module("app").directive("ngCellularBook", function($rootScope, toaster){
	function ctrl($rootScope, $scope, $modal){
		$rootScope.$watch('cellularPhoneBook', function(n, o){
			try{
				$rootScope.cellularPhone = n[0];
			}catch(e){}
		}, true);
		
	    $scope.showCellularPhoneBook = function (size) {
	      var modalInstance = $modal.open({
		        templateUrl: 'cellularPhoneBook.html',
		        size : 'sm',
		        controller : function($scope, $rootScope){
		        	$rootScope.cellularPhoneBook = $rootScope.cellularPhoneBook ? $rootScope.cellularPhoneBook : [];

		        	

		        	$scope.addphoneNumber = function(){
		        		$rootScope.cellularPhoneBook.push($scope.number);
		        		toaster.pop("success","Contacto", "Has agregado un nuevo numero");
		        		delete $scope.number;
		        	}	

		        	$scope.deletePhoneNumber = function(phone){
		        		$rootScope.cellularPhoneBook.splice($rootScope.cellularPhoneBook.indexOf(phone), 1);
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
		templateUrl : "tpl/fields/cellularPhoneBook.html",
		link : link
	}
});