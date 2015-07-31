angular.module('app').controller("loginController", ["$scope", "$location", "$window", "UserService", "AuthenticationService", "$rootScope", "$localStorage", function($scope, $location, $window, UserService, AuthenticationService, $rootScope, $localStorage){

	$scope.login = function(){
        UserService.signIn($scope.user.usuario, $scope.user.password).then(function(res) {
        	if(res.status == 200){
            	AuthenticationService.isAuthenticated = true;
                $localStorage.credential = res.data; 
            	$location.path("/app/panel");        		
        	}else{
            	$location.path("/login");        		
        	}
        })
	}

	$scope.logOut = function(){
		if(AuthenticationService.isAuthenticated){
            UserService.logOut().then(function(res){
                $location.path("/login");                
                $localStorage.$reset();
                AuthenticationService.isAuthenticated = false;
                delete $rootScope.credential;
            });
		}
	}
}]);