angular.module('app').controller("navigationController", ["$scope", "$location", "$localStorage", "UserService", "AuthenticationService", "$API", "$rootScope", "$socket", function($scope, $location, $localStorage, UserService, AuthenticationService, $API, $rootScope, $socket){
	$scope.Load = function(){
		$scope.documents = [];
	    angular.forEach($rootScope.credential.user.misEstados, function(estado){
	     	if(estado.subscribed){
		        $socket.on(estado.nombre, function(res){
		        	$scope.documents.push(res);
		        });

				$API.DocDocumento.Search({
					estado : estado._id
				}).then(function(res){
					$scope.documents = res.data;
				});	     		
	     	}
	    })
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