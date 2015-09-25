angular.module('app').controller("notificacionController", ["$scope", "$location", "$localStorage", "UserService", "AuthenticationService", "$API", "$rootScope", "$socket", function($scope, $location, $localStorage, UserService, AuthenticationService, $API, $rootScope, $socket){
	$scope.Load = function(){
		$scope.documents = [];
	    angular.forEach($rootScope.credential.user.metadata.misEstados, function(estado){
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
}]);