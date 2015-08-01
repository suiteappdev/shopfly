angular.module('app').controller("navigationController", ["$scope", "$location", "$localStorage", "UserService", "AuthenticationService", "$API", "$rootScope", function($scope, $location, $localStorage, UserService, AuthenticationService, $API, $rootScope){
	$scope.Load = function(){
		
	}

	$scope.getPendingDoc =  function(){

	}
	
	$scope.logOut = function(){
		if(AuthenticationService.isAuthenticated){
        	UserService.logOut().then(function(res){
        		if(res.status == 200){
		            $localStorage.$reset();
		        	AuthenticationService.isAuthenticated = false;
		        	delete $rootScope.user;
					$location.path("login");          			
        		}
        	});
		}
	}
}]);