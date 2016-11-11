angular.module('app').controller("loginController", ["$scope", "$location", "$window", "UserService", "AuthenticationService", "$rootScope", "$localStorage", "toaster", function($scope, $location, $window, UserService, AuthenticationService, $rootScope, $localStorage, toaster){

	$scope.login = function(){
        UserService.signIn($scope.user.usuario, $scope.user.password).then(function(res) {
        	console.log("login req", res);
            if(res.status == 200){
            	AuthenticationService.isAuthenticated = true;
                $localStorage.credential = res.data; 
            	$location.path("/app/panel");        		
        	}else if(res.status == 404){
               toaster.pop("error","Credenciales", "Este usuario no existe"); 
            }else if(res.status == 400){
               toaster.pop("error","Credenciales", "Contraseña incorrecta"); 
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